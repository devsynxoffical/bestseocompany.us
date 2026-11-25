import { industryPages, servicePages } from "./index";
import { caseStudies } from "../case-studies";

export type MenuIconName =
  | "pin" | "gear" | "search" | "link" | "store" | "spark" | "robot" | "user" | "branches" | "bag" | "cart" | "building"
  | "box" | "chat" | "tag" | "gauge" | "backlink" | "traffic" | "rank" | "book" | "pen" | "info" | "trophy" | "mail" | "check" | "grid"
  | "hammer" | "drop" | "roof" | "snow" | "bolt" | "tooth" | "cross" | "spine" | "leaf" | "paw" | "scale" | "shield" | "car" | "calc"
  | "umbrella" | "fork" | "house" | "wrench" | "bed" | "cloud";

export type MenuLink = { href: string; label: string; desc?: string; icon?: MenuIconName };
export type MenuColumn = { title: string; links: MenuLink[]; tone?: string };
export type MenuItem = {
  label: string;
  href: string;
  /** lg = full-width panel; md / sm = narrower panel under its own trigger. */
  size?: "lg" | "md" | "sm";
  columns?: MenuColumn[];
  feature?: { eyebrow: string; title: string; copy: string; href: string; cta: string; tone: string };
  /** Thin strip along the bottom of the panel. */
  footer?: { text: string; links: MenuLink[] };
};

/** Short, one-line labels for the menu (the pages' own intros are too long for a dropdown). */
const SERVICE: Record<string, { label?: string; desc: string; icon: MenuIconName }> = {
  "local-seo": { desc: "Rank in the map pack near you", icon: "pin" },
  "technical-seo": { desc: "Speed, crawling and indexing fixes", icon: "gear" },
  "google-seo": { desc: "Win more of Google's results", icon: "search" },
  "link-building": { desc: "Earn links from real sites", icon: "link" },
  "google-business-profile-seo": { label: "Google Business Profile", desc: "Optimize your Maps listing", icon: "store" },
  "small-business-seo": { desc: "Focused plans for smaller budgets", icon: "user" },
  "multi-location-seo": { desc: "Every location ranks locally", icon: "branches" },
  "ecommerce-seo": { label: "Ecommerce SEO", desc: "Category and product pages that sell", icon: "cart" },
  "shopify-seo": { desc: "Fix Shopify's SEO gaps", icon: "bag" },
  "enterprise-seo": { desc: "SEO for large, complex sites", icon: "building" },
  "answer-engine-optimization": { label: "Answer Engine (AEO)", desc: "Show up in AI Overviews", icon: "spark" },
  "generative-engine-optimization": { label: "Generative Engine (GEO)", desc: "Get cited by ChatGPT and others", icon: "robot" },
  "seo-packages": { desc: "Compare plans and deliverables", icon: "box" },
  "seo-consultant": { label: "SEO Consulting", desc: "Expert guidance for your team", icon: "chat" },
  "white-label-seo": { desc: "SEO for agencies, under your brand", icon: "tag" },
};
const svc = (slug: string): MenuLink => {
  const p = servicePages.find((x) => x.slug === slug);
  if (!p) throw new Error(`menu: unknown service ${slug}`);
  const s = SERVICE[slug];
  return { href: `/services/${slug}`, label: s.label ?? p.name, desc: s.desc, icon: s.icon };
};

/** Industry links, grouped into four balanced columns of five. */
const IND_GROUPS: { title: string; tone: string; items: [string, string, MenuIconName][] }[] = [
  { title: "Home services", tone: "var(--lime)", items: [["contractor-seo", "Contractors", "hammer"], ["plumber-seo", "Plumbers", "drop"], ["roofing-seo", "Roofers", "roof"], ["hvac-seo", "HVAC", "snow"], ["electrician-seo", "Electricians", "bolt"]] },
  { title: "Health", tone: "var(--pink)", items: [["dental-seo", "Dentists", "tooth"], ["medical-seo", "Doctors and clinics", "cross"], ["chiropractor-seo", "Chiropractors", "spine"], ["med-spa-seo", "Med spas", "leaf"], ["veterinary-seo", "Veterinarians", "paw"]] },
  { title: "Legal and finance", tone: "var(--lav)", items: [["law-firm-seo", "Law firms", "scale"], ["personal-injury-seo", "Personal injury", "shield"], ["car-accident-lawyer-seo", "Car accident lawyers", "car"], ["accountant-seo", "Accountants", "calc"], ["insurance-agency-seo", "Insurance agencies", "umbrella"]] },
  { title: "Local business", tone: "var(--taupe)", items: [["restaurant-seo", "Restaurants", "fork"], ["real-estate-seo", "Real estate", "house"], ["auto-repair-seo", "Auto repair", "wrench"], ["hotel-seo", "Hotels", "bed"], ["saas-seo", "SaaS", "cloud"]] },
];
const industryColumns = (): MenuColumn[] =>
  IND_GROUPS.map((g) => ({
    title: g.title,
    tone: g.tone,
    links: g.items.map(([slug, label, icon]) => {
      if (!industryPages.some((x) => x.slug === slug)) throw new Error(`menu: unknown industry ${slug}`);
      return { href: `/industries/${slug}`, label, icon };
    }),
  }));

/** Builds the header navigation (runs on the server). */
export function buildMenu(): MenuItem[] {
  return [
    {
      label: "Services",
      href: "/services",
      size: "lg",
      columns: [
        { title: "Core SEO", tone: "var(--lav)", links: ["local-seo", "technical-seo", "google-seo", "link-building", "google-business-profile-seo"].map(svc) },
        { title: "By business", tone: "var(--lime)", links: ["small-business-seo", "multi-location-seo", "ecommerce-seo", "shopify-seo", "enterprise-seo"].map(svc) },
        { title: "AI search and more", tone: "var(--pink)", links: ["answer-engine-optimization", "generative-engine-optimization", "seo-packages", "seo-consultant", "white-label-seo"].map(svc) },
      ],
      feature: { eyebrow: "Free", title: "40-point SEO audit", copy: "Your top five fixes, sent within 48 hours.", href: "/free-seo-audit", cta: "Get my audit", tone: "var(--lime)" },
      footer: { text: "Plans from $1,500 a month. Month to month after 90 days.", links: [{ href: "/pricing", label: "See pricing" }, { href: "/services", label: `All ${servicePages.length} services` }] },
    },
    {
      label: "Industries",
      href: "/industries",
      size: "lg",
      columns: industryColumns(),
      feature: { eyebrow: `${industryPages.length} industries`, title: "SEO built for your market", copy: "Pages, keywords and local tactics for your industry.", href: "/industries", cta: "Find your industry", tone: "var(--pink)" },
      footer: { text: "Don't see your industry? We likely cover it.", links: [{ href: "/industries", label: `All ${industryPages.length} industries` }] },
    },
    {
      label: "Free tools",
      href: "/tools/free-seo-tools",
      size: "md",
      columns: [
        { title: "Free SEO tools", tone: "var(--lav)", links: [
          { href: "/tools/seo-audit-tool", label: "SEO audit tool", desc: "Check any page in seconds", icon: "gauge" },
          { href: "/tools/backlink-checker", label: "Backlink checker", desc: "See who links to a site", icon: "backlink" },
          { href: "/tools/website-traffic-checker", label: "Traffic checker", desc: "Estimate a site's search traffic", icon: "traffic" },
          { href: "/tools/seo-rank-checker", label: "Rank checker", desc: "Where you rank for a keyword", icon: "rank" },
        ] },
      ],
      feature: { eyebrow: "Live tool", title: "Audit any page in seconds", copy: "Titles, schema, speed, indexing and more.", href: "/tools/seo-audit-tool", cta: "Run the audit", tone: "var(--pink)" },
      footer: { text: "No sign-up needed.", links: [{ href: "/tools/free-seo-tools", label: "All free tools" }] },
    },
    {
      label: "Resources",
      href: "/blog",
      size: "md",
      columns: [
        { title: "Learn", tone: "var(--pink)", links: [
          { href: "/blog", label: "Blog", desc: "Practical SEO tactics", icon: "pen" },
          { href: "/guides", label: "SEO guides", desc: "Straight answers to big questions", icon: "book" },
          { href: "/results", label: "Results", desc: "Real Search Console reports", icon: "trophy" },
        ] },
        { title: "Popular guides", tone: "var(--lime)", links: [
          { href: "/guides/what-is-seo", label: "What is SEO?" },
          { href: "/guides/seo-cost", label: "How much does SEO cost?" },
          { href: "/guides/best-seo-strategy", label: "Best SEO strategy" },
          { href: "/guides/seo-keyword-research", label: "Keyword research" },
          { href: "/guides/choose-seo-agency-for-aeo", label: "Choosing an AEO agency" },
        ] },
      ],
      footer: { text: "New guides every week.", links: [{ href: "/guides", label: "All guides" }] },
    },
    { label: "Pricing", href: "/pricing" },
    {
      label: "Company",
      href: "/about",
      size: "md",
      columns: [
        { title: "Company", tone: "var(--taupe)", links: [
          { href: "/about", label: "About us", desc: "Who we are and how we work", icon: "info" },
          { href: "/locations", label: "Locations", desc: "SEO services by state", icon: "pin" },
          { href: "/contact", label: "Contact", desc: "Talk to a strategist", icon: "mail" },
          { href: "/free-seo-audit", label: "Free SEO audit", desc: "The best place to start", icon: "check" },
        ] },
        { title: "Case studies", tone: "var(--lime)", links: ["01", "09", "07", "06", "10"].map((id) => {
          const c = caseStudies.find((x) => x.id === id);
          if (!c) throw new Error(`menu: no case study ${id}`);
          return { href: `/results/${c.slug}`, label: c.r.client, desc: id === "10" ? "Clicks up 47%, CTR doubled" : `${c.r.clicks} clicks, ${c.r.period.split(",")[0].toLowerCase()}`, icon: "rank" as MenuIconName };
        }) },
      ],
      footer: { text: "Real Google Search Console reports, shared with permission.", links: [{ href: "/results", label: `All ${caseStudies.length} case studies` }] },
    },
  ];
}
