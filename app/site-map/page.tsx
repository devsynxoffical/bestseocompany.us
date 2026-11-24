import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { guidePages, industryPages, servicePages, toolPages } from "@/lib/pages";
import { blogPosts } from "@/lib/pages/blog-index";
import { industryCategories } from "@/lib/pages/categories";
import { PageHero } from "@/components/pages/PageHero";

export const metadata: Metadata = buildMetadata({
  title: "Sitemap | Best SEO Company",
  description: "Every page on the Best SEO Company website: services, industries, free SEO tools, guides, blog posts and company pages, in one list.",
  path: "/site-map",
});

export default function HtmlSitemap() {
  const crumbs = [{ name: "Home", path: "/" }, { name: "Sitemap", path: "/site-map" }];
  const sections: Array<{ title: string; links: Array<[string, string]> }> = [
    { title: "Company", links: [["/", "Home"], ["/about", "About"], ["/pricing", "Pricing"], ["/results", "Results"], ["/free-seo-audit", "Free SEO audit"], ["/contact", "Contact"], ["/editorial-policy", "Editorial policy"], ["/privacy", "Privacy policy"], ["/terms", "Terms of use"]] },
    { title: "Services", links: [["/services", "All services"], ...servicePages.map((p): [string, string] => [`/services/${p.slug}`, p.name])] },
    { title: "Free tools", links: toolPages.map((p): [string, string] => [`/tools/${p.slug}`, p.name]) },
    ...industryCategories.map((c) => ({ title: `Industries: ${c.name}`, links: c.slugs.map((s): [string, string] => [`/industries/${s}`, `${industryPages.find((p) => p.slug === s)?.name} SEO`]) })),
    { title: "Guides", links: [["/guides", "All guides"], ...guidePages.map((p): [string, string] => [`/guides/${p.slug}`, p.question])] },
    { title: "Blog", links: [["/blog", "All posts"], ...blogPosts.map((p): [string, string] => [`/blog/${p.slug}`, p.title])] },
  ];
  return (
    <main>
      <PageHero crumbs={crumbs} eyebrow="All pages" h1="Sitemap." intro="Every page on the site in one place. Search engines can use our XML sitemap at /sitemap.xml." color="taupe" wide />
      <section className="block" style={{ paddingTop: 10 }}>
        <div className="wrap smap">
          {sections.map((s) => (
            <div key={s.title}>
              <h2>{s.title}</h2>
              <ul>{s.links.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
