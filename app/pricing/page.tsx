import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Pricing } from "@/components/sections/Pricing";
import { plans, yearlyDiscount, site } from "@/lib/content";
import { breadcrumbSchema, faqSchema, ORG_ID } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { RelatedLinks } from "@/components/pages/RelatedLinks";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "SEO Pricing: Plans From $1,500/Month | Best SEO Company",
  description: "Transparent SEO pricing from Best SEO Company. Starter $1,500/month, Growth $3,500/month, custom Scale plans. Month-to-month after 90 days, 15% off yearly.",
  path: "/pricing",
});

const rows: Array<[string, string, string, string]> = [
  ["Best for", "One location", "Several cities or a busy niche", "E-commerce, SaaS, multi-location"],
  ["Google Business Profile management", "✓", "✓", "✓"],
  ["Technical audit and fixes", "✓", "✓", "Unlimited"],
  ["New or optimized pages per month", "2", "6", "Custom"],
  ["Digital PR and link building", "–", "✓", "✓"],
  ["AI search (AEO/GEO) visibility tracking", "–", "–", "✓"],
  ["Strategy calls", "Monthly", "Every two weeks", "Dedicated team"],
  ["Reporting", "Monthly one-page report", "Monthly report", "Monthly + quarterly roadmap"],
];

const faqs = [
  { q: "Is there a contract?", a: "Every plan starts with a 90-day term so the work has time to show results. After that it's month to month, and you can cancel with 30 days' notice." },
  { q: "How does the yearly discount work?", a: `Pay yearly and the monthly rate drops by ${Math.round(yearlyDiscount * 100)}%. It's the same work and the same reporting, billed annually.` },
  { q: "Are there setup fees?", a: "No. The free audit and onboarding are included. If your site needs a large one-off project, like a migration or rebuild, we quote it separately before any work starts." },
  { q: "Do you guarantee rankings?", a: "No honest agency can, because Google controls the results. We agree on targets for traffic and leads up front and report on them every month." },
  { q: "Which plan should I choose?", a: "Most single-location businesses start on Starter. If you compete in several cities or a crowded niche, Growth adds the content and links you need. Book a free audit and we'll recommend one." },
];

export default function PricingPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Pricing", path: "/pricing" }];
  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs), {
        "@context": "https://schema.org", "@type": "OfferCatalog", name: "SEO plans", url: `${site.url}/pricing`,
        itemListElement: plans.filter((p) => p.monthly).map((p) => ({
          "@type": "Offer", name: `${p.name} SEO plan`, description: p.blurb, seller: { "@id": ORG_ID },
          priceSpecification: { "@type": "UnitPriceSpecification", price: p.monthly, priceCurrency: "USD", unitText: "MONTH" },
        })),
      }]} />
      <PageHero crumbs={crumbs} eyebrow="Pricing" h1="Simple, transparent SEO pricing." intro="Three plans, published prices, no setup fees. Month to month after your first 90 days." color="lime" wide />
      <Pricing />
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="rel-h" style={{ marginBottom: 20 }}>Compare plans</h2>
          <Reveal className="g-table compare">
            <table>
              <thead><tr><th scope="col">Feature</th><th scope="col">Starter</th><th scope="col">Growth</th><th scope="col">Scale</th></tr></thead>
              <tbody>{rows.map((r) => <tr key={r[0]}><th scope="row">{r[0]}</th><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>)}</tbody>
            </table>
          </Reveal>
        </div>
      </section>
      <FaqAccordion faqs={faqs} heading="Pricing questions." />
      <RelatedLinks heading="Before you decide" items={[
        { href: "/guides/seo-cost", label: "How much does SEO cost?", kind: "Guide" },
        { href: "/services/seo-packages", label: "SEO packages explained", kind: "Service" },
        { href: "/free-seo-audit", label: "Get a free 40-point audit", kind: "Free" },
      ]} />
      <LeadBand heading="Not sure which plan fits?" copy="Send your website. We'll audit it and recommend a plan based on your market and goals." />
    </main>
  );
}
