import { guidePages, industryPages, servicePages, toolPages } from "./index";
import { industryCategories } from "./categories";

export type MenuLink = { href: string; label: string; desc?: string };
export type MenuColumn = { title: string; links: MenuLink[]; more?: MenuLink };
export type MenuItem = {
  label: string;
  href: string;
  columns?: MenuColumn[];
  feature?: { eyebrow: string; title: string; copy: string; href: string; cta: string; tone: string };
};

const first = (s: string) => s.split(". ")[0].replace(/\.$/, "") + ".";
const svc = (slug: string): MenuLink => {
  const p = servicePages.find((x) => x.slug === slug)!;
  return { href: `/services/${slug}`, label: p.name, desc: first(p.intro) };
};

/** Builds the header navigation from the content registry (runs on the server). */
export function buildMenu(): MenuItem[] {
  return [
    {
      label: "Services",
      href: "/services",
      columns: [
        { title: "Core SEO", links: ["local-seo", "technical-seo", "google-seo", "link-building", "google-business-profile-seo"].map(svc) },
        { title: "AI search", links: ["answer-engine-optimization", "generative-engine-optimization"].map(svc) },
        { title: "By business", links: ["small-business-seo", "multi-location-seo", "ecommerce-seo", "shopify-seo", "enterprise-seo"].map(svc), more: { href: "/services", label: "All services" } },
        { title: "Buying SEO", links: [svc("seo-packages"), svc("seo-consultant"), { href: "/pricing", label: "Pricing", desc: "Plans from $1,500 a month." }] },
      ],
      feature: { eyebrow: "Free", title: "40-point SEO audit", copy: "We review your site, rankings and links and send you the top fixes.", href: "/free-seo-audit", cta: "Get my audit", tone: "var(--lime)" },
    },
    {
      label: "Industries",
      href: "/industries",
      columns: industryCategories.slice(0, 4).map((c): MenuColumn => ({
        title: c.name,
        links: c.slugs.slice(0, 6).map((s) => {
          const p = industryPages.find((x) => x.slug === s)!;
          return { href: `/industries/${s}`, label: `${p.name} SEO` };
        }),
      })).concat([{
        title: "More industries",
        links: [...industryCategories[4].slugs.slice(0, 2), ...industryCategories[5].slugs.slice(0, 3), "saas-seo"].map((s) => {
          const p = industryPages.find((x) => x.slug === s)!;
          return { href: `/industries/${s}`, label: `${p.name} SEO` };
        }),
        more: { href: "/industries", label: `All ${industryPages.length} industries` },
      }]),
    },
    {
      label: "Free tools",
      href: "/tools/free-seo-tools",
      columns: [
        { title: "Free SEO tools", links: toolPages.filter((t) => t.slug !== "free-seo-tools").map((t) => ({ href: `/tools/${t.slug}`, label: t.name, desc: t.mode === "live" ? "Runs instantly in your browser." : "Free report, sent by email." })), more: { href: "/tools/free-seo-tools", label: "All free tools" } },
      ],
      feature: { eyebrow: "Live tool", title: "Audit any page in seconds", copy: "Titles, schema, speed, indexing and 15 more checks.", href: "/tools/seo-audit-tool", cta: "Run the audit", tone: "var(--pink)" },
    },
    {
      label: "Resources",
      href: "/blog",
      columns: [
        { title: "Learn", links: [
          { href: "/blog", label: "Blog", desc: "Practical, timely SEO tactics." },
          { href: "/guides", label: "SEO guides", desc: "Straight answers to common questions." },
          { href: "/editorial-policy", label: "Editorial policy", desc: "How we research and write." },
        ] },
        { title: "Popular guides", links: ["what-is-seo", "seo-cost", "best-seo-strategy", "seo-keyword-research", "choose-seo-agency-for-aeo"].map((s) => {
          const g = guidePages.find((x) => x.slug === s)!;
          return { href: `/guides/${s}`, label: g.question };
        }), more: { href: "/guides", label: "All guides" } },
      ],
      feature: { eyebrow: "New", title: "SEO blog", copy: "Google Business Profile, reviews, Core Web Vitals and more.", href: "/blog", cta: "Read the blog", tone: "var(--lav)" },
    },
    { label: "Pricing", href: "/pricing" },
    {
      label: "Company",
      href: "/about",
      columns: [
        { title: "Company", links: [
          { href: "/about", label: "About us", desc: "Who we are and how we work." },
          { href: "/#results", label: "Results", desc: "Example client outcomes." },
          { href: "/contact", label: "Contact", desc: "Talk to a strategist." },
          { href: "/free-seo-audit", label: "Free SEO audit", desc: "Start here." },
        ] },
      ],
    },
  ];
}
