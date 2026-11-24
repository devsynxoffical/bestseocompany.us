import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { LeadBand } from "@/components/pages/LeadBand";
import { GscResults } from "@/components/sections/GscResults";

export const metadata: Metadata = buildMetadata({
  title: "SEO Results: Real Google Search Console Reports",
  description: "Ten real Google Search Console reports from client SEO projects: clicks, impressions, CTR and average position, shown exactly as Google reports them.",
  path: "/results",
  keywords: ["seo results", "seo case studies", "google search console results"],
});

export default function ResultsPage() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Results", path: "/results" }];
  return (
    <main>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow="Results" h1="SEO results, straight from Search Console." intro="No mock-ups and no rounded-up claims. These are Google Search Console performance reports from real client projects, with the period each one covers." color="lime" wide />
      <GscResults heading="Ten reports, ten sites." id="all-results" />
      <LeadBand heading="Want to see what's possible for your site?" copy="Send us your website. We'll audit it for free and show you where your search traffic can grow." />
    </main>
  );
}
