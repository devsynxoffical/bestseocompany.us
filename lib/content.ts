/**
 * All page copy lives here so the team can edit text without touching layout code.
 * Items marked SAMPLE are placeholders: replace them with real client data before launch.
 */

export const site = {
  name: "Best SEO Company",
  domain: "bestseocompany.us",
  url: "https://bestseocompany.us",
  email: "hello@bestseocompany.us",
  hours: "Mon–Fri, 9am–6pm ET",
  tagline: "SEO for US businesses that want more customers from search.",
  description:
    "US-based SEO agency for technical SEO, content, local SEO and link building. Free 40-point audit, monthly plain-English reports and no long-term contracts.",
  foundedYear: 2014,
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Free tools", href: "/tools" },
  { label: "Guides", href: "/guides" },
  { label: "Results", href: "/#results" },
  { label: "Pricing", href: "/#pricing" },
];

export const hero = {
  badge: "Best SEO Company · US-based SEO agency",
  copy: "Best SEO Company helps US businesses get found first on Google. We grow your rankings with technical fixes, content people actually read, and links that hold up. You get monthly reports in plain English.",
  formNote: "Free 40-point audit. Results in 48 hours.",
  // SAMPLE figures
  stickers: [
    { label: "Avg. organic traffic", value: "+212%", className: "s1", depth: 30 },
    { label: "Page-one keywords", value: "4,800+", className: "s2", depth: -20 },
    { label: "Map pack", value: "Top 3 ✓", className: "s3", depth: 14 },
  ],
};

export const marqueeRows = [
  ["Google Search", "Google Maps", "AI Overviews", "ChatGPT Search", "Bing", "Perplexity", "YouTube"],
  ["Technical SEO", "Local SEO", "Content strategy", "Link building", "Digital PR", "E-commerce SEO"],
];

export const statement = {
  parts: [
    "We don't sell rankings for vanity keywords. We find the searches that bring ",
    { text: "paying customers", chip: "lime" },
    ", fix what stops Google from ",
    { text: "trusting your site", chip: "lav" },
    ", and report on ",
    { text: "leads and revenue", chip: "pink" },
    ".",
  ] as Array<string | { text: string; chip: "lime" | "lav" | "pink" }>,
  // SAMPLE figures
  stats: [
    { value: 350, suffix: "+", label: "US businesses ranked" },
    { value: 12, suffix: " yrs", label: "doing SEO since 2014" },
    { value: 94, suffix: "%", label: "client retention after year one" },
    { value: 48, suffix: "h", label: "audit turnaround" },
  ],
};

export const audiences = {
  rotating: ["plumbers", "dentists", "law firms", "roofers", "online stores", "SaaS teams"],
  industries: [
    { name: "Home services", href: "/industries/home-services-seo" },
    { name: "Dental & medical", href: "/industries/dental-seo" },
    { name: "Law firms", href: "/industries/law-firm-seo" },
    { name: "Roofing & HVAC", href: "/industries/roofing-seo" },
    { name: "E-commerce", href: "/services/ecommerce-seo" },
    { name: "SaaS", href: "/industries/saas-seo" },
    { name: "Real estate", href: "/industries/real-estate-seo" },
    { name: "Restaurants", href: "/industries/restaurant-seo" },
    { name: "Auto repair", href: "/industries/auto-repair-seo" },
    { name: "Med spas", href: "/industries/med-spa-seo" },
    { name: "Financial advisors", href: "/industries/financial-services-seo" },
    { name: "Multi-location brands", href: "/services/multi-location-seo" },
  ],
};

export type ServiceColor = "lav" | "pink" | "taupe" | "lime";
export type Service = {
  id: string;
  color: ServiceColor;
  title: string;
  copy: string;
  tags: string[];
  stat: string;
  statLabel: string;
  visual: "audit" | "serp" | "map" | "links";
  href: string;
};

export const services: Service[] = [
  {
    id: "technical",
    href: "/services/technical-seo",
    color: "lav",
    title: "Technical SEO & Site Health",
    copy: "We crawl every page, fix speed and Core Web Vitals, clean up indexing errors and add schema, so Google can read your site properly.",
    tags: ["Core Web Vitals", "Crawl & index fixes", "Schema markup", "Site migrations"],
    stat: "2.1s",
    statLabel: "Average load time after our fixes",
    visual: "audit",
  },
  {
    id: "content",
    href: "/guides/seo-keyword-research",
    color: "pink",
    title: "Content That Ranks & Converts",
    copy: "Our writers build pages around what your buyers search for, from service pages to buying guides. Every piece has a target keyword and a job to do.",
    tags: ["Keyword research", "Service pages", "Blog strategy", "AI-search visibility"],
    stat: "3.4×",
    statLabel: "More organic leads in 12 months",
    visual: "serp",
  },
  {
    id: "local",
    href: "/services/local-seo",
    color: "taupe",
    title: "Local SEO & Google Maps",
    copy: "We optimize your Google Business Profile, build citations and set up review flows so you show up in the map pack where nearby customers search.",
    tags: ["Google Business Profile", "Citations", "Review generation", "Multi-location"],
    stat: "+187%",
    statLabel: "More calls from Google Maps",
    visual: "map",
  },
  {
    id: "links",
    href: "/services/link-building",
    color: "lime",
    title: "Link Building & Digital PR",
    copy: "We earn links from real publications through data stories, expert quotes and outreach. No private blog networks, no paid link farms.",
    tags: ["Digital PR", "Expert placements", "Link audits", "Competitor gap analysis"],
    stat: "150%",
    statLabel: "Increase in leads",
    visual: "links",
  },
];

// SAMPLE dashboard figures
export const dashboard = {
  kpis: [
    { label: "Organic clicks", value: 48210, separator: true, delta: "▲ 212% YoY" },
    { label: "Leads from search", value: 1284, separator: true, delta: "▲ 3.4×" },
    { label: "Avg. position", value: 4.2, decimals: 1, delta: "▲ from 19.8" },
    { label: "Keywords top 10", value: 612, delta: "▲ +488" },
  ],
  bars: [18, 22, 20, 26, 24, 30, 34, 40, 46, 52, 58, 62, 66, 70, 74, 80, 84, 88, 92, 96],
};

export const promises = [
  { tag: "Promise / A", color: "var(--lav)", title: "Senior strategists only.", copy: "Your account is run by someone with at least 7 years of SEO experience. No hand-offs to interns.", art: "check" },
  { tag: "Promise / B", color: "var(--pink)", title: "Reports in plain English.", copy: "One page each month: what moved, what it earned you, and what we're doing next.", art: "report" },
  { tag: "Promise / C", color: "var(--taupe)", title: "White-hat, always.", copy: "No link schemes, no spun content, no tricks that put your site at risk of a Google penalty.", art: "shield" },
  { tag: "Promise / D", color: "var(--lime)", title: "Month to month after 90 days.", copy: "We keep clients by getting results, not by locking them into long contracts.", art: "calendar" },
] as const;

// SAMPLE case studies
export const caseStudies = [
  {
    ribbon: "#DCD6FF",
    ribbonText: "#4433C9",
    words: ["Home Services", "Austin Plumbing"],
    title: "Austin Plumbing: 7 trucks, page one in 14 suburbs",
    copy: "A 9-month local SEO program: rebuilt service pages, suburb landing pages and a fully optimized Google Business Profile.",
    pills: ["Local SEO", "+318% traffic", "9 months"],
    mock: "dashboard",
  },
  {
    ribbon: "#FCE38A",
    ribbonText: "#8A5A00",
    words: ["E-commerce", "Outdoor Gear Store"],
    title: "Outdoor Gear Store: $1.2M in organic revenue",
    copy: "We fixed faceted-navigation indexing on Shopify and wrote 60 category buying guides that now rank for high-intent searches.",
    pills: ["E-commerce SEO", "2.6× conversion", "12 months"],
    mock: "shop",
  },
  {
    ribbon: "#C7F5B4",
    ribbonText: "#11602A",
    words: ["Dental Group", "Map Pack"],
    title: "Bright Dental: top 3 in the map pack in all 5 cities",
    copy: "Map pack optimization, location pages and an automated review program for every office of a multi-location dental group.",
    pills: ["Local SEO", "+187% calls", "6 months"],
    mock: "maps",
  },
] as const;

export const processSteps = [
  { num: "01", title: "Audit", copy: "A full crawl, backlink review and competitor scan. You get a prioritized fix list.", when: "Week 1–2" },
  { num: "02", title: "Strategy", copy: "We map keywords to pages and set targets for traffic, leads and revenue.", when: "Week 3" },
  { num: "03", title: "Build", copy: "Technical fixes go live, new content ships and outreach starts.", when: "Month 1–3" },
  { num: "04", title: "Report", copy: "A monthly call and a one-page report on rankings, leads and next steps.", when: "Every month" },
];

// SAMPLE quotes: replace with real, attributable client reviews
export const testimonials = [
  { quote: "Within six months we went from page three to the top of the map pack.", initials: "JM", name: "Client name", role: "Owner, home services", tone: "q-pink" },
  { quote: "The monthly reports are the first SEO reports I've actually understood.", initials: "AR", name: "Client name", role: "Marketing lead, e-commerce", tone: "q-white" },
  { quote: "They fixed technical problems two other agencies missed.", initials: "KL", name: "Client name", role: "Practice manager, healthcare", tone: "q-lav" },
  { quote: "Organic is now our biggest lead source, ahead of paid ads.", initials: "DS", name: "Client name", role: "Founder, SaaS", tone: "q-lime" },
  { quote: "Clear goals, clear reports, and they hit every target we set.", initials: "TP", name: "Client name", role: "Partner, law firm", tone: "q-taupe" },
];

export const plans = [
  {
    tier: "Local",
    name: "Starter",
    monthly: 1500 as number | null,
    blurb: "For single-location businesses that want to own their area.",
    features: ["Google Business Profile management", "Technical audit and fixes", "2 optimized pages per month", "Monthly report"],
    cta: "Start with Starter",
    featured: false,
  },
  {
    tier: "Growth",
    name: "Growth",
    monthly: 3500 as number | null,
    blurb: "For companies competing in several cities or a busy niche.",
    features: ["Everything in Starter", "6 content pieces per month", "Digital PR and link building", "Bi-weekly strategy calls"],
    cta: "Start with Growth",
    featured: true,
  },
  {
    tier: "National",
    name: "Scale",
    monthly: null as number | null,
    blurb: "For e-commerce, SaaS and multi-location brands with big targets.",
    features: ["Dedicated SEO team", "Unlimited technical work", "AI search visibility tracking", "Quarterly roadmap reviews"],
    cta: "Talk to us",
    featured: false,
  },
];

export const yearlyDiscount = 0.15;

export const posts = [
  { tag: "AI search", read: "6 min read", title: "How do I choose an SEO agency for AEO visibility?", color: "var(--lav)", art: "card", href: "/guides/choose-seo-agency-for-aeo" },
  { tag: "Pricing", read: "7 min read", title: "How much does SEO cost?", color: "var(--lime)", art: "pin", href: "/guides/seo-cost" },
  { tag: "Links", read: "7 min read", title: "What is SEO link building?", color: "var(--pink)", art: "network", href: "/guides/what-is-link-building" },
] as const;

export const faqs = [
  {
    q: "How long does SEO take to work?",
    a: "Most clients see ranking movement in 6 to 10 weeks and steady lead growth by month 4 to 6. Competitive national keywords can take longer, and we'll tell you that up front.",
  },
  {
    q: "Do you guarantee #1 rankings?",
    a: "No honest agency can, because Google controls the results. We commit to clear targets for traffic and leads, and we show you the work every month.",
  },
  {
    q: "Do I have to sign a long contract?",
    a: "There's a 90-day starting term so the work has time to show results. After that every plan is month to month.",
  },
  {
    q: "Do you work with businesses outside the US?",
    a: "We focus on US businesses and US search markets, which is how we keep our local knowledge sharp.",
  },
  {
    q: "What happens in the free audit?",
    a: "We check 40 points across technical health, content and links, then send a short video walkthrough with your top five fixes. No sales pressure.",
  },
];

// SAMPLE split
export const leadSources = [
  { label: "Google Search", value: 62 },
  { label: "Google Maps", value: 24 },
  { label: "AI search", value: 9 },
  { label: "Bing", value: 5 },
];

export const bentoSteps = ["Audit", "Strategy", "Build", "Report", "Grow"];
