import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { site, promises } from "@/lib/content";
import { industryPages, servicePages } from "@/lib/pages";
import { breadcrumbSchema, ORG_ID } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export const metadata: Metadata = buildMetadata({
  title: "About Best SEO Company | Best SEO Company",
  description: "Best SEO Company is a US-based SEO agency helping businesses rank on Google and get cited in AI search, with plain-English reporting and no long-term contracts.",
  path: "/about",
});

const tones = ["var(--lav)", "var(--pink)", "var(--taupe)", "var(--lime)"];

export default function AboutPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];
  const facts: Array<[string, string]> = [
    ["Name", site.name],
    ["Website", site.domain],
    ["What we do", "Search engine optimization (SEO), local SEO, technical SEO, link building and AI search visibility (AEO and GEO)"],
    ["Who we serve", "US businesses, from single-location service companies to national brands"],
    ["Where", "United States, working remotely with clients nationwide"],
    ["Contract terms", "90-day starting term, then month to month"],
    ["Contact", site.email],
  ];
  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), { "@context": "https://schema.org", "@type": "AboutPage", name: "About Best SEO Company", url: `${site.url}/about`, mainEntity: { "@id": ORG_ID } }]} />
      <PageHero crumbs={crumbs} eyebrow="About us" h1="An SEO team that reports in plain English." intro={`${site.name} helps US businesses get found on Google and in AI search. We focus on the searches that bring paying customers, and we show you exactly what we did and what it earned you.`} color="pink" wide />

      <section className="block" style={{ paddingTop: 20 }}>
        <div className="wrap two-col">
          <div>
            <Reveal as="span" variant="left" className="label eyebrow">How we work</Reveal>
            <SplitText parts={["Four promises in every contract."]} />
            <div className="cards4" style={{ marginTop: 28, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
              {promises.map((p, i) => (
                <Reveal key={p.title} delay={(i || undefined) as 1 | 2 | 3 | undefined} className="icard" style={{ ["--tc" as string]: tones[i] }}>
                  <h3>{p.title}</h3><p>{p.copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal variant="right" className="facts">
            <b>Key facts</b>
            <dl>{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </Reveal>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 10 }}>
        <div className="wrap two-col">
          <div>
            <Reveal as="span" variant="left" className="label eyebrow">What we do</Reveal>
            <SplitText parts={[`${servicePages.length} services, one goal.`]} />
            <Reveal as="p" className="lead-p">Every engagement starts with a free audit, so we only recommend the work your site actually needs. Then we report on leads and revenue, not vanity rankings.</Reveal>
          </div>
          <Reveal className="who-box">
            <b>Services</b>
            <ul>{servicePages.slice(0, 8).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name}</Link></li>)}<li><Link href="/services">All services</Link></li></ul>
          </Reveal>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <Reveal as="span" variant="left" className="label eyebrow">Who we work with</Reveal>
          <SplitText parts={[`${industryPages.length} industries and counting.`]} />
          <div className="inds" style={{ marginTop: 26 }}>
            {industryPages.slice(0, 18).map((p) => <Link key={p.slug} href={`/industries/${p.slug}`} className="ind">{p.name}</Link>)}
            <Link href="/industries" className="ind ind-all">All industries →</Link>
          </div>
        </div>
      </section>

      <LeadBand heading="See how we'd grow your business." copy="Send your website. We'll audit it for free and walk you through what we'd do first." />
    </main>
  );
}
