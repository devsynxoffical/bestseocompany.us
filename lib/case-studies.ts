/**
 * Case study pages built from the 10 Search Console reports in lib/results.ts.
 *
 * Rules:
 * - Every figure comes from the screenshot (via lib/results.ts) or is simple math on those
 *   figures, labeled "about". Trend notes describe only what the chart visibly shows.
 * - The work was delivered by our partner agency. Client names and work details are not shared
 *   unless the owner adds a verified `approach` (it renders only when present).
 */
import { gscResults, type GscResult } from "./results";

export type CaseStudy = {
  id: string;                 // matches GscResult.id
  slug: string;
  title: string;              // <title>, 60 characters or fewer
  metaDescription: string;    // 160 characters or fewer
  h1: string;
  inShort: string;            // 40 to 70 word answer block
  insights: { title: string; body: string }[]; // what the numbers and chart show
  /** Optional, owner-verified description of the work done. Leave undefined until confirmed. */
  approach?: string[];
  related: { href: string; label: string; kind: string }[];
};

const CASES: CaseStudy[] = [
  {
    id: "01",
    slug: "education-website-6-months",
    title: "Case Study: Education Website, 42.1K Google Clicks",
    metaDescription: "SEO case study from Google Search Console: an education website earned 42.1K clicks and 240K impressions in 6 months at a 17.6% CTR and position 7.5.",
    h1: "Education website: 42.1K clicks from Google in 6 months",
    inShort: "Between April and October 2026 this education website earned 42.1K clicks from 240K Google impressions. That is about 230 clicks a day on average, with 17.6 percent of searchers who saw the site clicking through, and an average position of 7.5, on the first page.",
    insights: [
      { title: "About 230 clicks a day", body: "42.1K clicks over roughly 183 days works out to about 230 clicks a day, every day, for six months." },
      { title: "A CTR most sites never reach", body: "A 17.6 percent click-through rate means roughly 1 in 6 people who saw the site in Google clicked it. High CTR usually comes from ranking for searches where the page is exactly what people want." },
      { title: "First-page average position", body: "An average position of 7.5 across all queries means the site sat, on average, on page one of Google." },
      { title: "Stronger in the second half", body: "The chart shows clicks lower in April and May, higher through July and August, and a sharp spike in early October." },
    ],
    related: [
      { href: "/services/technical-seo", label: "Technical SEO", kind: "Service" },
      { href: "/services/small-business-seo", label: "SEO services for small business", kind: "Service" },
    ],
  },
  {
    id: "02",
    slug: "education-platform-28-days",
    title: "Case Study: Education Platform, 26.9% CTR in 28 Days",
    metaDescription: "SEO case study from Google Search Console: a student education platform earned 9.04K clicks in 28 days at a 26.9% CTR and an average position of 6.1.",
    h1: "Student education platform: 9.04K clicks and a 26.9% CTR in 28 days",
    inShort: "In 28 days between September and October 2026, this student education platform earned 9.04K clicks from 33.6K impressions. That is about 323 clicks a day, a 26.9 percent click-through rate and an average position of 6.1, the strongest CTR and position of the ten reports we publish.",
    insights: [
      { title: "More than 1 in 4 searchers clicked", body: "A 26.9 percent CTR means more than a quarter of the people who saw the platform in Google clicked through. That is the highest CTR of our ten published reports." },
      { title: "About 323 clicks a day", body: "9.04K clicks over 28 days is about 323 clicks a day from organic search." },
      { title: "Average position 6.1", body: "The site's queries averaged position 6.1, on the first page of results." },
      { title: "A clear peak", body: "The chart shows a sharp jump in both clicks and impressions around 1 October 2026, before settling back to a steady level." },
    ],
    related: [
      { href: "/services/answer-engine-optimization", label: "Answer engine optimization", kind: "Service" },
      { href: "/guides/how-to-improve-seo", label: "How can SEO be improved?", kind: "Guide" },
    ],
  },
  {
    id: "03",
    slug: "education-website-3-months",
    title: "Case Study: Education Website, 25.4K Clicks in 3 Months",
    metaDescription: "SEO case study from Google Search Console: an education website earned 25.4K clicks and 130K impressions in 3 months at a 19.5% CTR and position 7.5.",
    h1: "Education website: 25.4K clicks in 3 months at a 19.5% CTR",
    inShort: "From July to October 2026 this education website earned 25.4K clicks from 130K impressions in Google. That is about 276 clicks a day, a 19.5 percent click-through rate and an average position of 7.5. Nearly 1 in 5 people who saw it in search clicked.",
    insights: [
      { title: "About 276 clicks a day", body: "25.4K clicks over roughly 92 days averages about 276 clicks a day." },
      { title: "Nearly 1 in 5 clicked", body: "A 19.5 percent CTR shows the pages matched what searchers were looking for." },
      { title: "Steady first-page visibility", body: "An average position of 7.5 kept the site on page one across its queries for the whole quarter." },
      { title: "A late-September jump", body: "The chart shows a strong July, a gradual dip through August and early September, and a sharp spike in late September." },
    ],
    related: [
      { href: "/services/google-seo", label: "Google SEO", kind: "Service" },
      { href: "/guides/track-seo-rankings", label: "How to track SEO rankings", kind: "Guide" },
    ],
  },
  {
    id: "09",
    slug: "publisher-network",
    title: "Case Study: Publisher Network, 3.45M Google Clicks",
    metaDescription: "SEO case study from Google Search Console: a publisher network earned 3.45M clicks and 421M impressions in 3 months, at an average position of 14.4.",
    h1: "Publisher network: 3.45M clicks and 421M impressions in 3 months",
    inShort: "From July to October 2022 this publisher network earned 3.45 million clicks from 421 million Google impressions. That is roughly 37,500 clicks a day across a very large set of queries, with a 0.8 percent click-through rate and an average position of 14.4.",
    insights: [
      { title: "Scale: about 37,500 clicks a day", body: "3.45M clicks over roughly 92 days averages about 37,500 clicks a day from Google." },
      { title: "421 million impressions", body: "At this size a site ranks for an enormous number of searches, many of them on page two, which is why the CTR (0.8 percent) is low while total clicks are huge." },
      { title: "A clear weekly rhythm", body: "The chart shows a regular weekly cycle in clicks, with peaks and dips repeating every week, typical of news and content publishers." },
      { title: "Rising impressions", body: "Impressions trend upward through August and September compared with July." },
    ],
    related: [
      { href: "/services/technical-seo", label: "Technical SEO", kind: "Service" },
      { href: "/services/enterprise-seo", label: "Enterprise SEO", kind: "Service" },
    ],
  },
  {
    id: "05",
    slug: "digital-agency-france",
    title: "Case Study: Digital Agency in France, 5.52M Impressions",
    metaDescription: "SEO case study from Google Search Console: a French digital agency earned 15.6K clicks and 5.52M impressions in 28 days at an average position of 16.6.",
    h1: "Digital agency, France: 15.6K clicks and 5.52M impressions in 28 days",
    inShort: "In August 2025 this digital agency in France earned 15.6K clicks from 5.52 million impressions in 28 days. That is about 557 clicks a day, a 0.3 percent click-through rate and an average position of 16.6. The report is in French, as it appeared in the client's Search Console.",
    insights: [
      { title: "About 557 clicks a day", body: "15.6K clicks over 28 days is about 557 clicks a day from organic search." },
      { title: "Visibility across millions of searches", body: "5.52M impressions in four weeks shows the site ranking for a very wide range of queries." },
      { title: "Room to grow clicks", body: "A 0.3 percent CTR at an average position of 16.6 means many of those rankings sit on page two. Moving them onto page one is where the next gains in clicks come from." },
      { title: "Steady through the month", body: "The chart shows a peak around 10 to 12 August and a fairly steady level for the rest of the month." },
    ],
    related: [
      { href: "/services/white-label-seo", label: "White label SEO for agencies", kind: "Service" },
      { href: "/services/link-building", label: "Link building", kind: "Service" },
    ],
  },
  {
    id: "04",
    slug: "saas-analytics-blog",
    title: "Case Study: SaaS Analytics Blog, 11.5K Google Clicks",
    metaDescription: "SEO case study from Google Search Console: a SaaS analytics blog earned 11.5K clicks and 314K impressions from March to May 2022 at a 3.7% CTR.",
    h1: "SaaS analytics blog: 11.5K clicks and 314K impressions",
    inShort: "From March to May 2022 this SaaS analytics blog earned 11.5K clicks from 314K Google impressions, a 3.7 percent click-through rate at an average position of 23.2. The chart ends on its highest point, with clicks rising sharply in the final days of the period.",
    insights: [
      { title: "11.5K clicks from content", body: "A blog that earns 11.5K clicks in about two months turns search into a steady source of product awareness for a SaaS company." },
      { title: "3.7 percent CTR at position 23.2", body: "Even with many rankings on page two or three, 3.7 percent of the people who saw the blog clicked through." },
      { title: "Ending on a high", body: "The chart shows clicks moving between roughly 75 and 150 a day for most of the period, then climbing to the period's highest level in the last days of May." },
    ],
    related: [
      { href: "/industries/saas-seo", label: "SaaS SEO", kind: "Industry" },
      { href: "/guides/seo-keyword-research", label: "How to do SEO keyword research", kind: "Guide" },
    ],
  },
  {
    id: "07",
    slug: "home-services-company",
    title: "Case Study: Home Services Company, 5.85K Clicks",
    metaDescription: "SEO case study from Google Search Console: a home services company earned 5.85K clicks and 822K impressions in 3 months, about 64 clicks a day.",
    h1: "Home services company: 5.85K clicks and 822K impressions in 3 months",
    inShort: "From August to October 2022 this home services company earned 5.85K clicks from 822K Google impressions. That is about 64 clicks a day, at a 0.7 percent click-through rate and an average position of 33.4. For a local service business, each of those clicks is a potential call or booking.",
    insights: [
      { title: "About 64 clicks a day", body: "5.85K clicks over roughly 92 days averages about 64 visitors a day from Google, for a business that sells to local customers." },
      { title: "Broad visibility", body: "822K impressions show the company appearing for a wide range of home service searches." },
      { title: "Consistent, not spiky", body: "The chart shows clicks holding in a steady band through the whole quarter, without sharp drops." },
      { title: "The next step", body: "With an average position of 33.4, many queries rank beyond page one. Service and city pages that move those into the map pack and the top results are where more calls come from." },
    ],
    related: [
      { href: "/industries/home-services-seo", label: "Home services SEO", kind: "Industry" },
      { href: "/services/local-seo", label: "Local SEO for small business", kind: "Service" },
    ],
  },
  {
    id: "08",
    slug: "seo-consultant-site",
    title: "Case Study: SEO Consultant Site, 7.37M Impressions",
    metaDescription: "SEO case study from Google Search Console: an SEO consultant's website earned 5.21K clicks and 7.37M impressions over 16 months.",
    h1: "SEO consultant site: 5.21K clicks and 7.37M impressions in 16 months",
    inShort: "Over 16 months this SEO consultant's website earned 5.21K clicks from 7.37 million Google impressions, with a 0.1 percent click-through rate and an average position of 34.5. It is a high-visibility, competitive niche where the next gains come from moving rankings onto page one.",
    insights: [
      { title: "7.37 million impressions", body: "The site appeared in Google results millions of times across a long period, in one of the most competitive niches online: SEO itself." },
      { title: "Long-term, steady clicks", body: "5.21K clicks over 16 months, with the chart showing a steady daily pattern and occasional spikes." },
      { title: "Where the upside is", body: "A 0.1 percent CTR at an average position of 34.5 shows most impressions come from rankings well below page one. Improving those positions is the clearest path to more clicks." },
    ],
    related: [
      { href: "/services/seo-consultant", label: "SEO consulting", kind: "Service" },
      { href: "/services/link-building", label: "Link building", kind: "Service" },
    ],
  },
  {
    id: "06",
    slug: "ecommerce-store",
    title: "Case Study: E-commerce Store, 2.26K Clicks in 24 Hours",
    metaDescription: "SEO case study from Google Search Console: an e-commerce store earned 2.26K clicks and 129K impressions from Google in a single 24-hour period in December 2024.",
    h1: "E-commerce store: 2.26K clicks from Google in 24 hours",
    inShort: "In a single 24-hour period in December 2024 this e-commerce store earned 2.26K clicks from 129K Google impressions, a 1.7 percent click-through rate at an average position of 30. That is about 94 clicks an hour from organic search during the holiday shopping season.",
    insights: [
      { title: "About 94 clicks an hour", body: "2.26K clicks in 24 hours averages about 94 shoppers an hour arriving from Google." },
      { title: "A morning peak", body: "The hourly chart shows clicks peaking at around 8 AM, then easing through the rest of the day." },
      { title: "Holiday season demand", body: "The report covers 7 to 8 December 2024, in the busiest weeks of the year for online stores, when organic traffic does not cost anything per click." },
    ],
    related: [
      { href: "/services/ecommerce-seo", label: "SEO services for ecommerce", kind: "Service" },
      { href: "/services/shopify-seo", label: "Shopify SEO", kind: "Service" },
    ],
  },
  {
    id: "10",
    slug: "b2b-saas-tool",
    title: "Case Study: B2B SaaS Tool, Clicks Up 47%",
    metaDescription: "SEO case study from Google Search Console: a B2B SaaS tool grew clicks 47% and doubled its CTR from 2% to 4.1%, comparing the last 3 months with the 3 before.",
    h1: "B2B SaaS tool: clicks up 47% and CTR doubled",
    inShort: "Comparing the last 3 months with the 3 months before, this B2B SaaS tool grew Google clicks from 469 to 693, up 47 percent, while impressions fell from 23K to 17.1K. Its click-through rate rose from 2 percent to 4.1 percent. Fewer, better-matched impressions produced more visitors.",
    insights: [
      { title: "More clicks from fewer impressions", body: "Clicks rose 47 percent (469 to 693) even though impressions fell 25 percent (23K to 17.1K). The site showed up for fewer searches, but the right ones." },
      { title: "CTR more than doubled", body: "Click-through rate went from 2 percent to 4.1 percent, a 104 percent increase, as shown in the report." },
      { title: "Position stayed similar", body: "Average position moved from 43.7 to 45.6, so the gain came from relevance and click appeal, not from a jump in rankings." },
    ],
    related: [
      { href: "/industries/saas-seo", label: "SaaS SEO", kind: "Industry" },
      { href: "/guides/best-seo-strategy", label: "What is the best strategy for SEO?", kind: "Guide" },
    ],
  },
];

export type CaseStudyFull = CaseStudy & { r: GscResult };
export const caseStudies: CaseStudyFull[] = CASES.map((c) => {
  const r = gscResults.find((x) => x.id === c.id);
  if (!r) throw new Error(`case study ${c.slug}: no result ${c.id}`);
  return { ...c, r };
});
export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const caseSlugForResult = (id: string) => CASES.find((c) => c.id === id)?.slug;
