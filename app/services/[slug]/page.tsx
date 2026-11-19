import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, servicePages } from "@/lib/pages";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { RankGrid } from "@/components/pages/RankGrid";
import { InlineAudit } from "@/components/pages/InlineAudit";
import { Timeline } from "@/components/pages/Timeline";
import { TrustStrip } from "@/components/pages/TrustStrip";

const LOCAL_SERVICES = ["local-seo", "google-business-profile-seo", "multi-location-seo", "small-business-seo"];

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getService((await params).slug);
  if (!p) return {};
  return buildMetadata({ defaultImage: false, title: p.title, description: p.metaDescription, path: `/services/${p.slug}`, keywords: [p.primaryKeyword, ...p.secondaryKeywords] });
}

const tones = ["var(--lav)", "var(--pink)", "var(--lime)", "var(--taupe)"];

export default async function ServicePageView({ params }: Params) {
  const p = getService((await params).slug);
  if (!p) notFound();
  const path = `/services/${p.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: p.name, path }];
  const related = p.related
    .map((s) => servicePages.find((x) => x.slug === s))
    .filter((x): x is NonNullable<typeof x> => !!x)
    .map((x) => ({ href: `/services/${x.slug}`, label: x.name, kind: "Service", blurb: x.intro.split(". ")[0] + "." }));

  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema({ name: p.name, description: p.metaDescription, path, serviceType: p.name }), faqSchema(p.faqs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="SEO service"
        h1={p.h1}
        intro={p.intro}
        color={p.color}
        actions={
          <>
            <MagneticLink href="#audit" arrow>Get a free audit</MagneticLink>
            <Link href="/#pricing" className="btn ghost">See pricing</Link>
          </>
        }
        aside={
          <div className="kpi-card" aria-label="What we report on">
            <span className="label">What we report on</span>
            <ul>
              {p.metrics.map((m, i) => (
                <li key={m} style={{ animationDelay: `${0.4 + i * 0.12}s` }}>
                  <span className="kpi-dot" style={{ background: tones[i % 4] }} />
                  {m}
                </li>
              ))}
            </ul>
            <div className="kpi-spark" aria-hidden="true">
              <svg viewBox="0 0 300 80" preserveAspectRatio="none"><path pathLength={1} d="M0 72 L40 66 L80 60 L120 52 L160 40 L200 34 L240 20 L300 8" fill="none" stroke="#111" strokeWidth="3" /></svg>
            </div>
          </div>
        }
      />

      <section className="block" style={{ paddingTop: 40 }}>
        <div className="wrap two-col">
          <div>
            <Reveal as="span" variant="left" className="label eyebrow">What it is</Reveal>
            <SplitText parts={[`${p.name}, explained.`]} />
            {p.whatItIs.map((t) => <Reveal as="p" key={t.slice(0, 20)} className="lead-p">{t}</Reveal>)}
          </div>
          <Reveal className="who-box" variant="right">
            <b>Who it's for</b>
            <ul>{p.whoFor.map((w) => <li key={w}>{w}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap"><TrustStrip /></div>
      </section>

      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["What you get."]} />
            <Reveal as="p">Concrete deliverables, not vague promises. You'll see each one in your monthly report.</Reveal>
          </div>
          <div className="cards3">
            {p.deliverables.map((d, i) => (
              <Reveal key={d.title} delay={((i % 3) || undefined) as 1 | 2 | undefined} className="icard" style={{ ["--tc" as string]: tones[i % 4] }}>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <Reveal>
            <InlineAudit
              heading={`See what ${p.name.toLowerCase()} would change for you.`}
              copy="Send your website. A strategist will audit it and show you exactly where this service would make the biggest difference."
              color={p.color}
              points={["A 40-point review of your site", "Competitor comparison for your market", "Your top five fixes, ranked by impact", "A video walkthrough, not a sales pitch"]}
            />
          </Reveal>
        </div>
      </section>

      {LOCAL_SERVICES.includes(p.slug) && (
        <section className="block" style={{ paddingTop: 10 }}>
          <div className="wrap rg-wrap">
            <div>
              <Reveal as="span" variant="left" className="label eyebrow">See it on the map</Reveal>
              <SplitText parts={["Rank across your whole service area."]} />
              <Reveal as="p" className="lead-p">The map pack changes from one neighborhood to the next. We measure your position on a grid of points and fix the gaps. Toggle the example to see the difference.</Reveal>
            </div>
            <Reveal variant="scale"><RankGrid business="your business" query="service near me" /></Reveal>
          </div>
        </section>
      )}

      <section className="block process">
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["How we deliver it."]} style={{ color: "var(--paper)" }} />
            <Reveal as="p">Four steps, in order. You'll know what's happening and why at every stage.</Reveal>
          </div>
          <ol className="steps" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {p.process.map((s, i) => (
              <Reveal as="li" key={s.title} delay={(i || undefined) as 1 | 2 | 3 | undefined} className="step on">
                <span className="num" aria-hidden="true">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 80 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["Your first six months."]} />
            <Reveal as="p">What we work on at each stage, and the outcome you should expect.</Reveal>
          </div>
          <Reveal><Timeline /></Reveal>
        </div>
      </section>

      <FaqAccordion faqs={p.faqs} heading={`${p.name} questions.`} />
      <RelatedLinks heading="Related services" items={related} />
      <LeadBand heading="See what this would do for your site." copy="Send us your website. We'll audit it and show you where this service would make the biggest difference." color={p.color} />
    </main>
  );
}
