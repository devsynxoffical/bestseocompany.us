import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, industryPages, servicePages } from "@/lib/pages";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { SerpVisual } from "@/components/pages/SerpVisual";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticLink } from "@/components/ui/MagneticLink";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return industryPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getIndustry((await params).slug);
  if (!p) return {};
  return {
    title: { absolute: p.title },
    description: p.metaDescription,
    keywords: [p.primaryKeyword, ...p.secondaryKeywords],
    alternates: { canonical: `/industries/${p.slug}` },
    openGraph: { title: p.title, description: p.metaDescription, url: `/industries/${p.slug}`, type: "website", images: ["/opengraph-image"] },
  };
}

const tones = ["var(--lav)", "var(--pink)", "var(--lime)", "var(--taupe)"];

export default async function IndustryPageView({ params }: Params) {
  const p = getIndustry((await params).slug);
  if (!p) notFound();
  const path = `/industries/${p.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }, { name: `${p.name} SEO`, path }];
  const related = p.related
    .map((s) => industryPages.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => !!x)
    .map((x) => ({ href: `/industries/${x.slug}`, label: `${x.name} SEO`, kind: "Industry", blurb: x.intro.split(". ")[0] + "." }));
  const coreServices = ["local-seo", "technical-seo", "link-building", "answer-engine-optimization"]
    .map((s) => servicePages.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => !!x);

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: `${p.name} SEO services`, description: p.metaDescription, path, serviceType: "Search engine optimization", audience: p.audience }),
          faqSchema(p.faqs),
        ]}
      />
      <PageHero
        crumbs={crumbs}
        eyebrow={`SEO for ${p.audience}`}
        h1={p.h1}
        intro={p.intro}
        color={p.color}
        actions={
          <>
            <MagneticLink href="#audit" arrow>Get a free {p.name.toLowerCase()} SEO audit</MagneticLink>
            <Link href="/#pricing" className="btn ghost">See pricing</Link>
          </>
        }
        aside={<SerpVisual searches={p.searches} business={`Your ${p.name} business`} />}
      />

      {/* Challenges */}
      <section className="block" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={[`Why ${p.audience} find SEO hard.`]} />
            <Reveal as="p">Every industry has its own search problems. These are the ones we solve first for {p.audience}.</Reveal>
          </div>
          <div className="cards4">
            {p.challenges.map((c, i) => (
              <Reveal key={c.title} delay={(i || undefined) as 1 | 2 | 3 | undefined} className="icard" style={{ ["--tc" as string]: tones[i % 4] }}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Searches */}
      <section className="block searches-sec" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["What your customers type into Google."]} />
            <Reveal as="p">We build pages that answer these searches, so you show up at the moment someone is ready to call or book.</Reveal>
          </div>
          <div className="qlist">
            {p.searches.map((s, i) => (
              <Reveal as="div" key={s.query} variant="tilt" delay={((i % 4) || undefined) as 1 | 2 | 3 | undefined} className="qpill">
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M15 15l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
                <span>{s.query}</span>
                <em>{s.intent}</em>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Playbook */}
      <section className="block process" id="process">
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={[`Our ${p.name.toLowerCase()} SEO playbook.`]} style={{ color: "var(--paper)" }} />
            <Reveal as="p">The order we work in for {p.audience}. Each step builds on the one before it.</Reveal>
          </div>
          <ol className="steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {p.playbook.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i || undefined) as 1 | 2 | 3 | undefined} className="step on">
                <span className="num" aria-hidden="true">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Quick wins + compliance */}
      <section className="block" style={{ paddingTop: 80 }}>
        <div className="wrap wins-grid">
          <div>
            <Reveal as="span" variant="left" className="label eyebrow">Quick wins</Reveal>
            <SplitText parts={["Five things you can fix this month."]} />
            {p.compliance && (
              <Reveal className="callout">
                <b>Compliance note</b>
                <p>{p.compliance}</p>
              </Reveal>
            )}
          </div>
          <ul className="wins">
            {p.quickWins.map((w, i) => (
              <Reveal as="li" key={w} delay={(i ? Math.min(i, 4) : undefined) as 1 | 2 | 3 | 4 | undefined}>
                <span className="wcheck" aria-hidden="true">✓</span>
                <span>{w}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Services used */}
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={[`What's included for ${p.audience}.`]} />
            <Reveal as="p">Every plan is built from these services, weighted to what moves the needle in your market.</Reveal>
          </div>
          <div className="svc-row">
            {coreServices.map((s, i) => (
              <Reveal key={s.slug} delay={(i || undefined) as 1 | 2 | 3 | undefined}>
                <Link href={`/services/${s.slug}`} className="svc-chip" style={{ ["--tc" as string]: `var(--${s.color})` }} data-cursor="Open">
                  <b>{s.name}</b>
                  <span>{s.intro.split(". ")[0]}.</span>
                  <i aria-hidden="true">↗</i>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion faqs={p.faqs} heading={`${p.name} SEO questions.`} />
      <RelatedLinks heading="Related industries" items={related} />
      <LeadBand heading={`Find out where your ${p.name.toLowerCase()} business ranks.`} copy={`Send us your website. A strategist will audit it against the ${p.name.toLowerCase()} competitors in your area and send you the top fixes.`} color={p.color} />
    </main>
  );
}
