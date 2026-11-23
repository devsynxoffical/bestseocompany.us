import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { servicePages } from "@/lib/pages";
import { breadcrumbSchema, faqSchema } from "@/lib/pages/schema";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { SplitText } from "@/components/ui/SplitText";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "SEO Services in the US | Best SEO Company",
  description: "SEO services in the US for local businesses and national brands: local, technical, e-commerce, link building and AI search. Free audit, plans from $1,500/mo.",
  path: "/services",
});

const HOW = [
  { t: "Free audit", b: "We crawl your site, check your Google Business Profile and compare you with the US competitors who outrank you." },
  { t: "90-day plan", b: "You get a written plan that maps keywords to pages and sets targets for traffic, calls and leads." },
  { t: "Build", b: "Technical fixes go live, pages are written or rebuilt, and link building starts." },
  { t: "Report and repeat", b: "One plain-English report a month on rankings, leads and what we do next. Month to month after 90 days." },
];

const SERVICE_FAQS = [
  {
    q: "What SEO services in the US do you offer?",
    a: "Local SEO, Google Business Profile optimization, technical SEO, e-commerce and Shopify SEO, link building, SEO for AI search (AEO and GEO), multi-location and enterprise SEO, consulting, and white label SEO for agencies.",
  },
  {
    q: "How much do SEO services cost in the US?",
    a: "Our plans start at $1,500 a month for single-location businesses and $3,500 a month for companies competing in several cities. National, e-commerce and multi-location programs are priced to scope. Most US agencies charge between $1,000 and $5,000 a month for ongoing SEO.",
  },
  {
    q: "Are you a US-based SEO agency?",
    a: "Yes. We work only with businesses that sell in the US and only in US search markets, so our keyword research, local SEO and reporting are built around how Americans search.",
  },
  {
    q: "Do I need every service?",
    a: "No. Most clients start with two or three, usually technical fixes, local SEO and content, and add link building or AI search work once the basics are in place. The free audit tells you where to start.",
  },
  {
    q: "How long before SEO services show results?",
    a: "Technical fixes and Google Business Profile changes can show movement within weeks. New pages usually take three to six months to build steady rankings, and competitive national keywords take longer.",
  },
];

export default function ServicesHub() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];
  const pick = [
    { need: "You want more calls from your area", answer: "Local SEO and Google Business Profile work", href: "/services/local-seo" },
    { need: "You run a small business on a tight budget", answer: "A focused small business SEO plan", href: "/services/small-business-seo" },
    { need: "Your pages aren't getting indexed or are slow", answer: "Technical SEO first", href: "/services/technical-seo" },
    { need: "You sell online", answer: "E-commerce or Shopify SEO", href: "/services/ecommerce-seo" },
    { need: "You want to show up in AI answers", answer: "Answer engine optimization", href: "/services/answer-engine-optimization" },
    { need: "You're an agency reselling SEO", answer: "White label SEO", href: "/services/white-label-seo" },
  ];
  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(SERVICE_FAQS)]} />
      <PageHero crumbs={crumbs} eyebrow={`${servicePages.length} services`} h1="SEO services in the US that grow your search traffic." intro="We're a US SEO agency. Pick one service or combine them into a plan. Every engagement starts with a free audit, so we only recommend what your site actually needs." color="pink" wide />
      <section className="block" style={{ paddingTop: 20 }}>
        <div className="wrap dir-grid">
          {servicePages.map((s, i) => (
            <Reveal key={s.slug} delay={((i % 4) || undefined) as 1 | 2 | 3 | undefined}>
              <Link href={`/services/${s.slug}`} className="dir-card" style={{ ["--tc" as string]: `var(--${s.color})` }} data-cursor="Open">
                <span className="dir-cat">Service</span>
                <b>{s.name}</b>
                <span className="dir-blurb">{s.intro.split(". ")[0]}.</span>
                <i aria-hidden="true">↗</i>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="block" style={{ paddingTop: 40 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["Which SEO service do you need?"]} />
            <Reveal as="p">Most US businesses need two or three of these, not all of them. Start from the problem you have today.</Reveal>
          </div>
          <div className="pick-list">
            {pick.map((x, i) => (
              <Reveal key={x.href} delay={((i % 3) || undefined) as 1 | 2 | undefined}>
                <Link href={x.href} className="pick-row" data-cursor="Open">
                  <span>{x.need}</span>
                  <b>{x.answer} <span aria-hidden="true">→</span></b>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="sec-head">
            <SplitText parts={["How our SEO services work."]} />
            <Reveal as="p">The same four steps for every client, from a single-location shop to a national brand.</Reveal>
          </div>
          <ol className="how-steps">
            {HOW.map((s, i) => (
              <Reveal as="li" key={s.t} delay={(i || undefined) as 1 | 2 | 3 | undefined}>
                <span className="num" aria-hidden="true">0{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
              </Reveal>
            ))}
          </ol>
          <p className="how-more">See what each plan includes on our <Link href="/pricing">pricing page</Link>, or read <Link href="/guides/best-seo-agency-usa">how to pick the best SEO agency in the USA</Link>.</p>
        </div>
      </section>
      <FaqAccordion faqs={SERVICE_FAQS} heading="SEO services questions." />
      <LeadBand heading="Not sure which service you need?" copy="Start with a free audit. We'll tell you which two or three things will make the biggest difference." />
    </main>
  );
}
