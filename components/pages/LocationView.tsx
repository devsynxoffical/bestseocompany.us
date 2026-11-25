import Link from "next/link";
import { site, plans } from "@/lib/content";
import { industryPages } from "@/lib/pages";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/lib/pages/schema";
import { getLocation, type LocationPage } from "@/data/locations";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { RelatedLinks, type RelatedItem } from "@/components/pages/RelatedLinks";
import { LeadBand } from "@/components/pages/LeadBand";
import { GscResults } from "@/components/sections/GscResults";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

const tones = ["var(--lav)", "var(--pink)", "var(--lime)", "var(--taupe)"];

/** Service schema with areaServed. No LocalBusiness: we have no office in these areas. */
export function locationServiceSchema(p: LocationPage) {
  const url = `${site.url}/locations/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `SEO services in ${p.name}`,
    serviceType: "Search engine optimization",
    description: p.metaDescription,
    url,
    provider: { "@type": "Organization", "@id": ORG_ID, name: site.name, url: site.url },
    areaServed: p.kind === "state"
      ? { "@type": "State", name: p.state, containedInPlace: { "@type": "Country", name: "United States" } }
      : { "@type": "City", name: p.name, containedInPlace: { "@type": "State", name: p.state } },
    offers: plans.filter((x) => x.monthly).map((x) => ({
      "@type": "Offer", name: `${x.name} SEO plan`, price: x.monthly, priceCurrency: "USD",
      priceSpecification: { "@type": "UnitPriceSpecification", price: x.monthly, priceCurrency: "USD", unitText: "MONTH" },
    })),
  };
}

export function LocationView({ p }: { p: LocationPage }) {
  const path = `/locations/${p.slug}`;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }, { name: p.name, path }];
  const industries = p.industries.map((m) => ({ ...m, page: industryPages.find((x) => x.slug === m.slug) })).filter((m) => m.page);
  const related: RelatedItem[] = [
    { href: "/locations", label: "SEO services in every US state", kind: "Locations" },
    ...p.neighbors.map((s) => getLocation(s)).filter((x): x is LocationPage => !!x).map((n) => ({ href: `/locations/${n.slug}`, label: `SEO company in ${n.name}`, kind: n.kind === "state" ? "State" : "City" })),
    ...industries.slice(0, 2).map((m) => ({ href: `/industries/${m.slug}`, label: `${m.page!.name} SEO`, kind: "Industry" })),
  ];

  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), locationServiceSchema(p), faqSchema(p.faqs)]} />
      <PageHero
        crumbs={crumbs}
        eyebrow={`SEO in ${p.name}`}
        h1={p.h1}
        intro={p.marketIntro}
        color="lime"
        wide
        actions={
          <>
            <Link href="/free-seo-audit" className="btn">Get a free audit <span className="arrow" aria-hidden="true">↗</span></Link>
            <Link href="/pricing" className="btn ghost">See pricing</Link>
          </>
        }
      />

      {/* Answer block */}
      <section className="block" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <Reveal className="loc-answer">
            <h2>What does an SEO company in {p.name} do for your business?</h2>
            <p>{p.answer}</p>
            <span className="loc-updated">Updated {new Date(p.updated + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
          </Reveal>
        </div>
      </section>

      {/* Local market, sourced */}
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={[`The ${p.name} market in numbers.`]} />
            <Reveal as="p">Public data on the businesses competing for the same searches as you. Each figure links to its source.</Reveal>
          </div>
          <div className="loc-facts">
            {p.facts.map((f, i) => (
              <Reveal key={f.stat + i} delay={((i % 3) || undefined) as 1 | 2 | undefined} className="loc-fact" style={{ ["--tc" as string]: tones[i % 4] }}>
                <b>{f.stat}</b>
                <p>{f.text}</p>
                <a href={f.source.url} target="_blank" rel="noopener noreferrer" className="loc-src">Source: {f.source.label}</a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={[`Industries we serve in ${p.name}.`]} />
            <Reveal as="p">Matched to the sectors with the most small businesses and employees in {p.state}.</Reveal>
          </div>
          <div className="loc-inds">
            {industries.map((m, i) => (
              <Reveal key={m.slug} delay={(i || undefined) as 1 | 2 | undefined}>
                <Link href={`/industries/${m.slug}`} className="loc-ind" style={{ ["--tc" as string]: tones[i % 4] }}>
                  <span className="loc-ind-k">Industry</span>
                  <b>{m.page!.name} SEO</b>
                  <p>{m.why}</p>
                  <span className="loc-ind-go">See {m.page!.name.toLowerCase()} SEO <span aria-hidden="true">→</span></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Local search behavior */}
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={[`How ${p.name} customers search.`]} />
            <Reveal as="p">What we plan around when we build an SEO program for a business in {p.state}.</Reveal>
          </div>
          <div className="loc-notes">
            {p.searchNotes.map((n, i) => (
              <Reveal key={n.title} delay={((i % 2) || undefined) as 1 | undefined} className="loc-note">
                <span className="loc-n">0{i + 1}</span>
                <h3>{n.title}</h3>
                <p>{n.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["What you get."]} />
            <Reveal as="p">Every plan is built from these services, weighted to what your market needs.</Reveal>
          </div>
          <div className="loc-offer">
            {p.offer.map((o, i) => (
              <Reveal key={o.title} delay={((i % 2) || undefined) as 1 | undefined}>
                <Link href={o.href} className="loc-off" style={{ ["--tc" as string]: tones[i % 4] }}>
                  <b>{o.title}</b>
                  <p>{o.body}</p>
                  <i aria-hidden="true">↗</i>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing (same packages as /pricing) */}
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={[`SEO pricing for ${p.name} businesses.`]} />
            <Reveal as="p">The same published plans as everywhere else. Month to month after a 90-day start.</Reveal>
          </div>
          <div className="loc-plans">
            {plans.map((pl) => (
              <Reveal key={pl.name} className={`loc-plan${pl.featured ? " on" : ""}`}>
                <span className="loc-plan-t">{pl.tier}</span>
                <b>{pl.name}</b>
                <span className="loc-price">{pl.monthly ? `$${pl.monthly.toLocaleString("en-US")}` : "Custom"}{pl.monthly && <small>/month</small>}</span>
                <p>{pl.blurb}</p>
                <ul>{pl.features.map((f) => <li key={f}>{f}</li>)}</ul>
              </Reveal>
            ))}
          </div>
          <p className="loc-more"><Link href="/pricing">Compare every plan</Link> or <Link href="/free-seo-audit">start with a free 40-point audit</Link>.</p>
        </div>
      </section>

      {/* Proof: national results, labeled as such */}
      <GscResults ids={["07", "01"]} heading={`Results from our network (not ${p.name}-specific).`} id="results" />

      {/* Areas, text only */}
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <Reveal className="loc-areas">
            <h2>Areas we cover in {p.name}</h2>
            <p>{p.areasNote}</p>
            <ul>{p.areas.map((a) => <li key={a}>{a}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      <FaqAccordion faqs={p.faqs} heading={`SEO in ${p.name}: questions.`} />
      <RelatedLinks heading="Keep exploring" items={related} />
      <LeadBand heading={`See where your ${p.name} business ranks.`} copy={`Send us your website. We'll audit it against the competitors you face in ${p.state} and send your top five fixes.`} />
    </main>
  );
}
