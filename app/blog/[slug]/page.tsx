import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { blogPosts, formatDate, getPost } from "@/lib/pages/blog-index";
import { titleForPath } from "@/lib/pages";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/lib/pages/schema";
import { site } from "@/lib/content";
import { JsonLd } from "@/components/pages/JsonLd";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import { ArticleBody } from "@/components/pages/ArticleBody";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return buildMetadata({ defaultImage: false, title: p.seoTitle, description: p.metaDescription, path: `/blog/${p.slug}`, type: "article", publishedTime: p.date, tags: p.tags, keywords: [p.primaryKeyword, ...p.tags] });
}

export default async function BlogPostView({ params }: Params) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: p.title, path }];
  const related = p.related.map((r) => {
    if (r.startsWith("/blog/")) { const b = getPost(r.split("/")[2]); return b ? { href: r, label: b.title, kind: "Blog" } : null; }
    return titleForPath(r);
  }).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <main>
      <JsonLd data={[
        breadcrumbSchema(crumbs),
        {
          "@context": "https://schema.org", "@type": "BlogPosting",
          headline: p.title, description: p.metaDescription, url: `${site.url}${path}`, mainEntityOfPage: `${site.url}${path}`,
          datePublished: p.date, dateModified: p.date, keywords: p.tags.join(", "), inLanguage: "en-US",
          author: { "@type": "Organization", "@id": ORG_ID, name: `${site.name} team` }, publisher: { "@id": ORG_ID },
          image: `${site.url}${path}/opengraph-image`,
          speakable: { "@type": "SpeakableSpecification", cssSelector: [".g-answer p", ".g-h1"] },
        },
        faqSchema(p.faqs),
      ]} />
      <header className="g-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <div className="g-meta">
            {p.tags.map((t) => <span key={t} className="g-cat">{t}</span>)}
            <span>{p.readMinutes} min read</span>
            <time dateTime={p.date}>{formatDate(p.date)}</time>
            <span>By the {site.name} team</span>
          </div>
          <SplitText as="h1" parts={[p.title]} className="g-h1" />
          <Reveal className="g-answer">
            <span className="label">In short</span>
            <p>{p.answer}</p>
          </Reveal>
        </div>
      </header>
      <ArticleBody takeaways={p.keyTakeaways} sections={p.sections} />
      <FaqAccordion faqs={p.faqs} heading="Questions about this post." />
      <RelatedLinks heading="Read next" items={related} />
      <LeadBand heading="Want an expert to look at your site?" copy="Send your website and we'll audit it for free, then tell you what to fix first." />
    </main>
  );
}
