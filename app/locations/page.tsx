import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { site, plans } from "@/lib/content";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/lib/pages/schema";
import { statePages } from "@/data/locations";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export const metadata: Metadata = buildMetadata({
  title: "SEO Services Near Me: Local SEO by State | Best SEO Company",
  description: "Looking for SEO services near you? We help US businesses rank in Google Maps and local search in every state. Plans from $1,500 a month. Free 40-point audit.",
  path: "/locations",
  keywords: ["seo services near me", "seo agency near me", "local seo company near me", "seo company by state"],
});

const HOW = [
  { t: "Near me depends on the searcher", b: "When someone types \"SEO services near me\" or \"plumber near me\", Google ranks businesses by distance from that person, relevance to the search and prominence, which includes reviews and links. No company can rank everywhere for \"near me\"; what you can do is be the strongest result in the places your customers actually are." },
  { t: "Every town is its own result", b: "Map pack positions change from one neighborhood to the next. We measure your position on a grid across your service area, find the towns where you are invisible and build pages, profile updates and reviews aimed at those gaps." },
  { t: "Local proof beats generic copy", b: "Pages that name real neighborhoods, show real jobs and answer local questions outperform pages that only swap a city name. That is why each of our location pages, and each page we build for clients, uses real local detail and public data." },
];

const FAQS = [
  { q: "How do I find good SEO services near me?", a: "Look for a company that publishes its prices, shows real results, explains how it will improve your Google Business Profile and local rankings, and reports on calls and leads. A local office is not required: most SEO work happens online, and what matters is how well the company knows your market." },
  { q: "Do you need to be local to do SEO for my business?", a: "No. We work remotely with businesses across the US and do not claim offices we do not have. We research your area, your competitors and how your customers search, then track your rankings across your real service area." },
  { q: "Why don't I show up when people search near me?", a: "Usually because of distance, an incomplete or miscategorized Google Business Profile, too few recent reviews, or a website without pages for your services and towns. A free audit shows which of these is holding you back." },
  { q: "How much do local SEO services cost?", a: "Local SEO in the US commonly runs about $1,000 to $2,500 a month for one location. Our plans start at $1,500 a month for one location and $3,500 a month for businesses competing in several cities." },
  { q: "Which states do you serve?", a: "All 50. We are adding detailed pages for each state and major city, starting with Texas and California, but we already work with businesses anywhere in the US." },
];

export default function LocationsHub() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Locations", path: "/locations" }];
  const states = statePages();
  const service = {
    "@context": "https://schema.org", "@type": "Service", name: "Local SEO services across the United States", serviceType: "Search engine optimization",
    url: `${site.url}/locations`, provider: { "@type": "Organization", "@id": ORG_ID, name: site.name, url: site.url },
    areaServed: { "@type": "Country", name: "United States" },
  };
  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), service, faqSchema(FAQS)]} />
      <PageHero crumbs={crumbs} eyebrow="Locations" h1="SEO services near you, in every US state." intro="Local SEO for businesses that want more calls and visits from the people searching nearby. Pick your state to see how we work there, or start with a free audit." color="lime" wide
        actions={<><Link href="/free-seo-audit" className="btn">Get a free audit <span className="arrow" aria-hidden="true">↗</span></Link><Link href="/pricing" className="btn ghost">See pricing</Link></>} />

      <section className="block" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <Reveal className="loc-answer">
            <h2>What do SEO services near me include?</h2>
            <p>Local SEO services help your business appear when nearby customers search on Google and in Google Maps. A plan covers your Google Business Profile, reviews, local citations, pages for your services and towns, and technical fixes. Best SEO Company works with businesses in every US state, remotely, with plans from $1,500 a month. Profile and review fixes often show results within weeks; new pages take three to six months.</p>
          </Reveal>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["Choose your state."]} />
            <Reveal as="p">Detailed pages with local data, matched industries and pricing. More states and cities are added every week.</Reveal>
          </div>
          <div className="loc-states">
            {states.map((s, i) => (
              <Reveal key={s.slug} delay={(i || undefined) as 1 | undefined}>
                <Link href={`/locations/${s.slug}`} className="loc-state">
                  <span className="loc-abbr">{s.abbr}</span>
                  <b>SEO company in {s.name}</b>
                  <p>{s.facts[0].stat} {s.facts[0].text}</p>
                  <span className="loc-ind-go">See {s.name} <span aria-hidden="true">→</span></span>
                </Link>
              </Reveal>
            ))}
            <Reveal className="loc-state soon">
              <span className="loc-abbr">+</span>
              <b>Coming next</b>
              <p>Florida, New Jersey, North Carolina and Utah, then city pages. We already serve businesses in all 50 states.</p>
              <Link href="/contact" className="loc-ind-go">Ask about your area <span aria-hidden="true">→</span></Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["How local search actually works."]} />
            <Reveal as="p">What decides who shows up when your customers search nearby.</Reveal>
          </div>
          <div className="loc-notes three">
            {HOW.map((n, i) => (
              <Reveal key={n.t} delay={(i || undefined) as 1 | 2 | undefined} className="loc-note">
                <span className="loc-n">0{i + 1}</span>
                <h3>{n.t}</h3>
                <p>{n.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["Local SEO pricing."]} />
            <Reveal as="p">The same published plans in every state.</Reveal>
          </div>
          <div className="loc-plans">
            {plans.map((pl) => (
              <Reveal key={pl.name} className={`loc-plan${pl.featured ? " on" : ""}`}>
                <span className="loc-plan-t">{pl.tier}</span>
                <b>{pl.name}</b>
                <span className="loc-price">{pl.monthly ? `$${pl.monthly.toLocaleString("en-US")}` : "Custom"}{pl.monthly && <small>/month</small>}</span>
                <p>{pl.blurb}</p>
              </Reveal>
            ))}
          </div>
          <p className="loc-more">See everything each plan includes on the <Link href="/pricing">pricing page</Link>, or read how our <Link href="/services/local-seo">local SEO service</Link> works.</p>
        </div>
      </section>

      <FaqAccordion faqs={FAQS} heading="SEO near me: questions." />
      <RelatedLinks heading="Keep exploring" items={[
        { href: "/services/local-seo", label: "Local SEO for small business", kind: "Service" },
        { href: "/services/google-business-profile-seo", label: "Google Business Profile", kind: "Service" },
        { href: "/industries", label: "SEO by industry", kind: "Industries" },
      ]} />
      <LeadBand heading="Find out where you rank near your customers." copy="Send your website. We'll check your map pack position across your service area and send the top fixes." />
    </main>
  );
}
