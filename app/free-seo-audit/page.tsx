import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import { LeadBand } from "@/components/pages/LeadBand";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticLink } from "@/components/ui/MagneticLink";

export const metadata: Metadata = buildMetadata({
  title: "Free SEO Audit: 40-Point Website Review | Best SEO Company",
  description: "Get a free 40-point SEO audit from Best SEO Company. We review your technical health, content, local presence and links, then send your top five fixes.",
  path: "/free-seo-audit",
});

const groups = [
  { title: "Technical health", tone: "var(--lav)", items: ["Indexing and crawl errors", "XML sitemap and robots.txt", "HTTPS and redirects", "Core Web Vitals (LCP, INP, CLS)", "Mobile usability", "Canonical tags and duplicates", "Structured data", "Broken links and 404s", "JavaScript rendering", "Site architecture and depth"] },
  { title: "On-page and content", tone: "var(--pink)", items: ["Title tags", "Meta descriptions", "Headings and page structure", "Search intent match", "Thin or duplicate pages", "Service and location coverage", "Internal linking", "Image alt text", "E-E-A-T signals", "FAQ and answer-ready content"] },
  { title: "Local and AI search", tone: "var(--lime)", items: ["Google Business Profile setup", "Categories and services", "Review volume and responses", "NAP consistency", "Key citations", "Map pack visibility", "AI Overview visibility", "Entity and brand consistency", "LocalBusiness schema", "Bing Places and Apple Business Connect"] },
  { title: "Links and competitors", tone: "var(--taupe)", items: ["Referring domains", "Link quality and spam risk", "Anchor text spread", "Top linked pages", "Competitor link gaps", "Competitor keyword gaps", "Share of top-10 rankings", "Branded vs non-branded traffic", "Quick-win keywords", "Content gaps"] },
];

const faqs = [
  { q: "Is the audit really free?", a: "Yes. There's no cost and no obligation. We send the findings whether or not you become a client." },
  { q: "What do I receive?", a: "A short written summary and a video walkthrough covering all 40 points, with your top five fixes ranked by impact and effort." },
  { q: "How long does it take?", a: "We aim to send it within 48 hours. For instant results on a single page, use our free SEO audit tool." },
  { q: "Do I need to give you access to my accounts?", a: "No. The audit uses public data. If you want us to include Search Console or Analytics data, we'll ask for read-only access." },
];

export default function FreeAuditPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Free SEO audit", path: "/free-seo-audit" }];
  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(faqs), serviceSchema({ name: "Free 40-point SEO audit", description: metadata.description as string, path: "/free-seo-audit", serviceType: "SEO audit" })]} />
      <PageHero
        crumbs={crumbs}
        eyebrow="Free · 40 points · no obligation"
        h1="Get a free 40-point SEO audit."
        intro="We review your technical health, content, local presence and links against your real competitors, then send you the five fixes that matter most."
        color="lime"
        wide
        actions={<><MagneticLink href="#audit" arrow>Request my audit</MagneticLink><Link href="/tools/seo-audit-tool" className="btn ghost">Try the instant tool</Link></>}
      />
      <section className="block" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <div className="sec-head"><SplitText parts={["What we check."]} /><Reveal as="p">Forty checks across four areas. Each one is something we've seen hold sites back.</Reveal></div>
          <div className="cards4">
            {groups.map((g, i) => (
              <Reveal key={g.title} delay={(i || undefined) as 1 | 2 | 3 | undefined} className="icard" style={{ ["--tc" as string]: g.tone }}>
                <h3>{g.title}</h3>
                <ol className="audit-list">{g.items.map((it) => <li key={it}>{it}</li>)}</ol>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <LeadBand heading="Request your free audit." copy="Enter your website and email. We'll send your 40-point audit and video walkthrough." />
      <FaqAccordion faqs={faqs} heading="Audit questions." />
    </main>
  );
}
