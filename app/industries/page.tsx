import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { industryPages } from "@/lib/pages";
import { industryCategories } from "@/lib/pages/categories";
import { breadcrumbSchema } from "@/lib/pages/schema";
import { JsonLd } from "@/components/pages/JsonLd";
import { PageHero } from "@/components/pages/PageHero";
import { IndustryDirectory } from "@/components/pages/IndustryDirectory";
import { LeadBand } from "@/components/pages/LeadBand";
import { site } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "SEO by Industry | 45 Industries We Rank | Best SEO Company",
  description: "SEO built for your industry: law firms, roofers, dentists, HVAC, med spas, real estate, SaaS and more. See how we win searches in your market.",
  path: "/industries",
});

export default function IndustriesHub() {
  const catOf = (slug: string) => industryCategories.find((c) => c.slugs.includes(slug))?.name ?? "Local & professional";
  const items = industryPages.map((p) => ({
    slug: p.slug, name: p.name, color: p.color, category: catOf(p.slug),
    blurb: p.intro.split(". ")[0] + ".", keywords: [p.audience, p.primaryKeyword, ...p.secondaryKeywords].join(" "),
  }));
  const crumbs = [{ name: "Home", path: "/" }, { name: "Industries", path: "/industries" }];
  return (
    <main>
      <JsonLd data={[breadcrumbSchema(crumbs), {
        "@context": "https://schema.org", "@type": "CollectionPage", name: "SEO by industry", url: `${site.url}/industries`,
        hasPart: industryPages.map((p) => ({ "@type": "WebPage", name: `${p.name} SEO`, url: `${site.url}/industries/${p.slug}` })),
      }]} />
      <PageHero crumbs={crumbs} eyebrow={`${industryPages.length} industries`} h1="SEO built for your industry." intro="Roofers, law firms and dentists don't win customers the same way, so we don't optimize them the same way. Find your industry to see the searches, problems and playbook we work from." color="lav" wide />
      <section className="block" style={{ paddingTop: 20 }}>
        <div className="wrap"><IndustryDirectory items={items} categories={industryCategories.map((c) => c.name)} /></div>
      </section>
      <LeadBand heading="Don't see your industry?" copy="We work with most local and national businesses. Send your website and we'll show you how we'd approach your market." />
    </main>
  );
}
