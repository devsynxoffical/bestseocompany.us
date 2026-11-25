import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/content";
import { breadcrumbSchema, ORG_ID } from "@/lib/pages/schema";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { RESULTS_DISCLOSURE } from "@/lib/results";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return buildMetadata({ title: c.title, description: c.metaDescription, path: `/results/${c.slug}`, type: "article", keywords: ["seo case study", `${c.r.client.toLowerCase()} seo`, "google search console results"] });
}

const METRICS = [
  { k: "Clicks", d: "How many times someone clicked through to the site from Google Search." },
  { k: "Impressions", d: "How many times the site appeared in a searcher's results, even if they didn't scroll to it." },
  { k: "CTR", d: "Click-through rate: clicks divided by impressions. It shows how often people chose this site when they saw it." },
  { k: "Avg. position", d: "The site's average ranking across every query it appeared for. 1 to 10 is roughly page one." },
];

export default async function CaseStudyPage({ params }: Params) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  const { r } = c;
  const path = `/results/${c.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Results", path: "/results" }, { name: r.client, path }];
  const idx = caseStudies.findIndex((x) => x.slug === c.slug);
  const more = [1, 2, 3].map((k) => caseStudies[(idx + k) % caseStudies.length]);
  const article = {
    "@context": "https://schema.org", "@type": "Article", headline: c.h1, description: c.metaDescription,
    image: `${site.url}${r.img}`, url: `${site.url}${path}`, mainEntityOfPage: `${site.url}${path}`,
    datePublished: "2026-11-24", dateModified: "2026-11-25", inLanguage: "en-US",
    author: { "@type": "Organization", "@id": ORG_ID, name: site.name }, publisher: { "@id": ORG_ID },
    about: "Search engine optimization results",
  };

  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), article]} />
      <PageHero crumbs={crumbs} eyebrow={`Case study · ${r.period}`} h1={c.h1} intro={RESULTS_DISCLOSURE} color="lime" wide />

      {/* Key numbers + report */}
      <section className="block" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <Reveal className="cs-kpis">
            <div className="on"><span>Clicks</span><b>{r.clicks}</b></div>
            <div><span>Impressions</span><b>{r.impressions}</b></div>
            <div><span>CTR</span><b>{r.ctr}</b></div>
            <div><span>Avg. position</span><b>{r.position}</b></div>
          </Reveal>
          <Reveal as="figure" className="cs-shot">
            <img src={r.img} width={r.width} height={r.height} alt={`Google Search Console performance report for a ${r.client.toLowerCase()}: ${r.clicks} clicks, ${r.impressions} impressions, ${r.ctr} CTR, average position ${r.position}, ${r.period.toLowerCase()}`} />
            <figcaption>Google Search Console, Performance report. {r.period}. Shown exactly as Google reports it.</figcaption>
          </Reveal>
        </div>
      </section>

      {/* Answer block */}
      <section className="block" style={{ paddingTop: 16 }}>
        <div className="wrap">
          <Reveal className="loc-answer">
            <h2>What did this site get from Google?</h2>
            <p>{c.inShort}</p>
            {r.note && <span className="loc-updated">{r.note}</span>}
          </Reveal>
        </div>
      </section>

      {/* What the report shows */}
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["What the report shows."]} />
            <Reveal as="p">Read straight from the numbers and the chart. Where we do simple math, like clicks per day, we say so.</Reveal>
          </div>
          <div className="loc-notes">
            {c.insights.map((n, i) => (
              <Reveal key={n.title} delay={((i % 2) || undefined) as 1 | undefined} className="loc-note">
                <span className="loc-n">0{i + 1}</span>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Work details only when verified by the owner */}
      {c.approach && (
        <section className="block" style={{ paddingTop: 24 }}>
          <div className="wrap">
            <div className="sec-head"><SplitText parts={["What was done."]} /></div>
            <ul className="cs-approach">{c.approach.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </section>
      )}

      {/* How to read + disclosure */}
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap cs-two">
          <Reveal className="cs-read">
            <h2>How to read this report</h2>
            <dl>{METRICS.map((m) => <div key={m.k}><dt>{m.k}</dt><dd>{m.d}</dd></div>)}</dl>
          </Reveal>
          <Reveal className="cs-note">
            <h2>What we can share</h2>
            <p>This report comes from a client project delivered by our partner agency and is published with permission. The client&apos;s name and the specific work are kept private, so we show the result exactly as Google reports it and nothing we can&apos;t verify.</p>
            <p>Want to know what a plan like this would look like for your site? <Link href="/free-seo-audit">Start with a free 40-point audit</Link> or <Link href="/pricing">see our pricing</Link>.</p>
            <p className="cs-rel">Related: {c.related.map((l, i) => <span key={l.href}>{i ? ", " : ""}<Link href={l.href}>{l.label}</Link></span>)}</p>
          </Reveal>
        </div>
      </section>

      <RelatedLinks heading="More case studies" items={more.map((m) => ({ href: `/results/${m.slug}`, label: m.h1, kind: `${m.r.clicks} clicks` }))} />
      <LeadBand heading="Want results like these?" copy="Send us your website. We'll audit it for free and show you where your search traffic can grow." />
    </main>
  );
}
