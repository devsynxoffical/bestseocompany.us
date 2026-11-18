import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, guidePages, titleForPath } from "@/lib/pages";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/lib/pages/schema";
import { site } from "@/lib/content";
import { JsonLd } from "@/components/pages/JsonLd";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { LeadBand } from "@/components/pages/LeadBand";
import { TocSpy } from "@/components/pages/TocSpy";
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
  return {
    title: { absolute: p.title },
    description: p.metaDescription,
    keywords: [p.primaryKeyword],
    alternates: { canonical: `/guides/${p.slug}` },
    openGraph: { title: p.title, description: p.metaDescription, url: `/guides/${p.slug}`, type: "article", publishedTime: PUBLISHED, images: ["/opengraph-image"] },
  };
}

const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default async function GuidePageView({ params }: Params) {
  const p = getGuide((await params).slug);
  if (!p) notFound();
  const path = `/guides/${p.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: p.question, path }];
  const related = p.related.map(titleForPath).filter((x): x is NonNullable<typeof x> => !!x);
  const toc = p.sections.map((s) => ({ id: anchor(s.heading), label: s.heading }));

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
            image: `${site.url}/opengraph-image`,
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

      <div className="wrap g-body">
        <aside className="g-side">
          <TocSpy items={toc} />
          <div className="g-side-cta">
            <b>Free SEO audit</b>
            <p>See how your site scores in under a minute.</p>
            <Link href="/tools/seo-audit-tool" className="btn">Run the audit <span className="arrow" aria-hidden="true">↗</span></Link>
          </div>
        </aside>

        <article className="g-article">
          <Reveal className="g-takeaways">
            <b>Key takeaways</b>
            <ul>{p.keyTakeaways.map((t) => <li key={t}>{t}</li>)}</ul>
          </Reveal>
          {p.sections.map((s) => (
            <section key={s.heading} id={anchor(s.heading)} className="g-sec">
              <h2>{s.heading}</h2>
              {s.paragraphs.map((t, i) => (
                t.trim().startsWith("{") || t.includes('"@context"')
                  ? <pre key={i} className="g-code"><code>{t}</code></pre>
                  : <p key={i}>{t}</p>
              ))}
              {s.bullets && <ul>{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              {s.table && (
                <div className="g-table">
                  <table>
                    <thead><tr>{s.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                    <tbody>{s.table.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => (ci === 0 ? <th key={ci} scope="row">{c}</th> : <td key={ci}>{c}</td>))}</tr>)}</tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </article>
      </div>

      <FaqAccordion faqs={p.faqs} heading="Follow-up questions." />
      <RelatedLinks heading="Read next" items={related} />
      <LeadBand heading="Rather have experts handle it?" copy="Send us your website. We'll audit it for free and tell you exactly what to fix first." />
    </main>
  );
}
