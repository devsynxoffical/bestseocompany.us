import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getGuide, guidePages, titleForPath } from "@/lib/pages";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/lib/pages/schema";
import { site } from "@/lib/content";
import { JsonLd } from "@/components/pages/JsonLd";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { LeadBand } from "@/components/pages/LeadBand";
import { ArticleBody } from "@/components/pages/ArticleBody";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

type Params = { params: Promise<{ slug: string }> };

const PUBLISHED = "2026-11-18";

export const dynamicParams = false;
export function generateStaticParams() {
  return guidePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getGuide((await params).slug);
  if (!p) return {};
  return buildMetadata({ defaultImage: false, title: p.title, description: p.metaDescription, path: `/guides/${p.slug}`, type: "article", publishedTime: PUBLISHED, keywords: [p.primaryKeyword] });
}


export default async function GuidePageView({ params }: Params) {
  const p = getGuide((await params).slug);
  if (!p) notFound();
  const path = `/guides/${p.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: p.question, path }];
  const related = p.related.map(titleForPath).filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.question,
            description: p.metaDescription,
            url: `${site.url}${path}`,
            mainEntityOfPage: `${site.url}${path}`,
            datePublished: PUBLISHED,
            dateModified: PUBLISHED,
            author: { "@type": "Organization", "@id": ORG_ID, name: site.name },
            publisher: { "@id": ORG_ID },
            image: `${site.url}${path}/opengraph-image`,
            inLanguage: "en-US",
            speakable: { "@type": "SpeakableSpecification", cssSelector: [".g-answer p", ".g-h1"] },
          },
          faqSchema(p.faqs),
        ]}
      />

      <header className="g-head">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <div className="g-meta"><span className="g-cat">{p.category}</span><span>{p.readMinutes} min read</span><span>Updated Nov 18, 2026</span></div>
          <SplitText as="h1" parts={[p.question]} className="g-h1" />
          <Reveal className="g-answer">
            <span className="label">Short answer</span>
            <p>{p.answer}</p>
          </Reveal>
        </div>
      </header>

      <ArticleBody takeaways={p.keyTakeaways} sections={p.sections} />

      <FaqAccordion faqs={p.faqs} heading="Follow-up questions." />
      <RelatedLinks heading="Read next" items={related} />
      <LeadBand heading="Rather have experts handle it?" copy="Send us your website. We'll audit it for free and tell you exactly what to fix first." />
    </main>
  );
}
