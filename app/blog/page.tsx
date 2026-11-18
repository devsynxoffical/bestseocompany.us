import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { blogPosts, formatDate } from "@/lib/pages/blog-index";
import { breadcrumbSchema, ORG_ID } from "@/lib/pages/schema";
import { site } from "@/lib/content";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  ...buildMetadata({ title: "SEO Blog: Practical Tactics for US Businesses | Best SEO Company", description: "Practical SEO tactics from Best SEO Company: Google Business Profile, reviews, Core Web Vitals, local citations, schema, site migrations and AI search.", path: "/blog" }),
  alternates: { canonical: "/blog", languages: { "en-US": "https://bestseocompany.us/blog", "x-default": "https://bestseocompany.us/blog" }, types: { "application/rss+xml": "/blog/rss.xml" } },
};

const tones = ["lav", "pink", "lime", "taupe"];

export default function BlogHub() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }];
  const [lead, ...rest] = blogPosts;
  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), {
        "@context": "https://schema.org", "@type": "Blog", name: "Best SEO Company Blog", url: `${site.url}/blog`, publisher: { "@id": ORG_ID },
        blogPost: blogPosts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}`, datePublished: p.date })),
      }]} />
      <PageHero crumbs={crumbs} eyebrow="Blog" h1="Practical SEO you can use this week." intro="Short, specific posts on the tactics that move local and national rankings. Written by practitioners, reviewed for accuracy." color="lav" wide />
      <section className="block" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <Reveal>
            <Link href={`/blog/${lead.slug}`} className="blog-lead" data-cursor="Read">
              <span className="dir-cat">Latest · {formatDate(lead.date)} · {lead.readMinutes} min read</span>
              <b>{lead.title}</b>
              <span>{lead.excerpt}</span>
              <span className="blog-tags">{lead.tags.map((t) => <i key={t}>{t}</i>)}</span>
            </Link>
          </Reveal>
          <div className="dir-grid" style={{ marginTop: 16 }}>
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={((i % 3) || undefined) as 1 | 2 | undefined}>
                <Link href={`/blog/${p.slug}`} className="dir-card" style={{ ["--tc" as string]: `var(--${tones[i % 4]})` }} data-cursor="Read">
                  <span className="dir-cat">{formatDate(p.date)} · {p.readMinutes} min read</span>
                  <b>{p.title}</b>
                  <span className="dir-blurb">{p.excerpt}</span>
                  <i aria-hidden="true">↗</i>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="blog-rss"><a href="/blog/rss.xml">RSS feed</a> · <Link href="/guides">Looking for in-depth answers? Read our guides →</Link></p>
        </div>
      </section>
      <LeadBand heading="Want us to do this for you?" copy="Send your website and we'll audit it for free, then show you which of these tactics would help most." />
    </main>
  );
}
