/**
 * Content types for the programmatic SEO pages.
 * Each page type is a plain data object rendered by a shared template, so copy
 * can be edited without touching layout code.
 */

export type FAQ = { q: string; a: string };
export type Color = "lav" | "pink" | "taupe" | "lime";
export type TitledText = { title: string; body: string };

/** /industries/[slug] — "SEO for <industry>" landing pages. */
export type IndustryPage = {
  slug: string;               // e.g. "roofing-seo"
  name: string;               // short label, e.g. "Roofing"
  audience: string;           // plural noun phrase used in copy, e.g. "roofing contractors"
  title: string;              // <title>, max 60 chars, includes primary keyword
  metaDescription: string;    // 140-155 chars
  primaryKeyword: string;     // e.g. "roofing seo"
  secondaryKeywords: string[]; // 3-6 close variants
  h1: string;                 // max ~8 words
  intro: string;              // 2-3 sentences
  color: Color;
  schemaType: string;         // schema.org type of the client business, e.g. "RoofingContractor"
  challenges: TitledText[];   // exactly 4: why SEO is hard in this industry
  searches: { query: string; intent: string }[]; // exactly 6 realistic customer searches + short intent label
  playbook: TitledText[];     // exactly 4 ordered steps of our approach for this industry
  quickWins: string[];        // exactly 5 concrete tactics
  compliance?: string;        // optional advertising/regulatory note (legal, medical, financial...)
  faqs: FAQ[];                // exactly 4
  related: string[];          // 3 related industry slugs
};

/** /services/[slug] — SEO service pages. */
export type ServicePage = {
  slug: string;
  name: string;               // short label, e.g. "Technical SEO"
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  h1: string;
  intro: string;
  color: Color;
  whatItIs: string[];         // 2 paragraphs
  whoFor: string[];           // exactly 4 bullets
  deliverables: TitledText[]; // exactly 6
  process: TitledText[];      // exactly 4 ordered steps
  metrics: string[];          // exactly 4 KPIs we report on
  faqs: FAQ[];                // exactly 5
  related: string[];          // 3 related service slugs
};

/** /tools/[slug] — free tool pages. */
export type ToolPage = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  h1: string;
  intro: string;
  color: Color;
  /** "live" = runs in the browser via our API; "report" = visitor requests a report by email. */
  mode: "live" | "report";
  howItWorks: TitledText[];   // exactly 3 steps
  whatYouGet: TitledText[];   // exactly 6 checks/metrics explained
  explainer: { heading: string; paragraphs: string[] }[]; // 2-3 educational blocks
  faqs: FAQ[];                // exactly 4
  related: string[];          // other tool slugs or service slugs prefixed "services/" e.g. "services/technical-seo"
};

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  table?: { head: string[]; rows: string[][] };
};

/** /guides/[slug] — question-led articles written for search and answer engines. */
export type GuidePage = {
  slug: string;
  question: string;           // H1, the question as people ask it
  title: string;              // <title>, max 60 chars
  metaDescription: string;
  primaryKeyword: string;
  category: string;           // e.g. "SEO basics", "Pricing", "AI search"
  readMinutes: number;
  answer: string;             // 40-60 word direct answer (featured snippet / AI answer)
  keyTakeaways: string[];     // exactly 4
  sections: GuideSection[];   // 5-8 sections
  faqs: FAQ[];                // 3-4
  related: string[];          // 3-4 internal paths, e.g. "/services/local-seo", "/guides/what-is-seo"
};

/** /blog/[slug] — timely, practical posts (different topics from the evergreen guides). */
export type BlogPost = {
  slug: string;
  title: string;              // H1
  seoTitle: string;           // <title>, max 60 chars
  metaDescription: string;    // 140-155 chars
  primaryKeyword: string;
  excerpt: string;            // 1-2 sentences for cards and RSS
  date: string;               // ISO date
  tags: string[];             // 2-4
  readMinutes: number;
  answer: string;             // 40-60 word summary answer
  keyTakeaways: string[];     // exactly 4
  sections: GuideSection[];   // 5-7
  faqs: FAQ[];                // 3
  related: string[];          // 3 internal paths
};

/** Long-form legal / policy pages. */
export type PolicyPage = {
  slug: string;
  title: string;
  metaDescription: string;
  updated: string;            // ISO date
  intro: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};
