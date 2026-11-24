/**
 * Google Search Console performance reports from our partner agency's client work,
 * shared with permission. Client names are hidden. Numbers and periods are exactly as
 * shown in each screenshot. Do not edit the figures.
 */
export type GscResult = {
  id: string;
  img: string;
  width: number;
  height: number;
  client: string;
  period: string;
  clicks: string;
  impressions: string;
  ctr: string;
  position: string;
  note?: string;
};

export const RESULTS_DISCLOSURE =
  "Google Search Console reports from client projects delivered by our partner agency, shared with permission. Client names are hidden. Every figure is shown exactly as Google reports it.";

export const gscResults: GscResult[] = [
  { id: "01", img: "/gsc/01-education-website-6-months.webp", width: 1400, height: 760, client: "Education website", period: "6 months, Apr to Oct 2026", clicks: "42.1K", impressions: "240K", ctr: "17.6%", position: "7.5" },
  { id: "02", img: "/gsc/02-education-platform-28-days.webp", width: 1400, height: 520, client: "Student education platform", period: "28 days, Sep to Oct 2026", clicks: "9.04K", impressions: "33.6K", ctr: "26.9%", position: "6.1" },
  { id: "03", img: "/gsc/03-education-website-3-months.webp", width: 1400, height: 528, client: "Education website", period: "3 months, Jul to Oct 2026", clicks: "25.4K", impressions: "130K", ctr: "19.5%", position: "7.5" },
  { id: "09", img: "/gsc/09-publisher-network.webp", width: 1200, height: 540, client: "Publisher network", period: "3 months, Jul to Oct 2022", clicks: "3.45M", impressions: "421M", ctr: "0.8%", position: "14.4" },
  { id: "05", img: "/gsc/05-digital-agency-france.webp", width: 1200, height: 440, client: "Digital agency, France", period: "28 days, Aug 2025", clicks: "15.6K", impressions: "5.52M", ctr: "0.3%", position: "16.6" },
  { id: "04", img: "/gsc/04-saas-analytics-blog.webp", width: 1200, height: 522, client: "SaaS analytics blog", period: "Mar to May 2022", clicks: "11.5K", impressions: "314K", ctr: "3.7%", position: "23.2" },
  { id: "07", img: "/gsc/07-home-services-company.webp", width: 1200, height: 459, client: "Home services company", period: "3 months, Aug to Oct 2022", clicks: "5.85K", impressions: "822K", ctr: "0.7%", position: "33.4" },
  { id: "08", img: "/gsc/08-seo-consultant-site.webp", width: 1200, height: 378, client: "SEO consultant site", period: "16 months", clicks: "5.21K", impressions: "7.37M", ctr: "0.1%", position: "34.5" },
  { id: "06", img: "/gsc/06-ecommerce-store.webp", width: 1200, height: 365, client: "E-commerce store", period: "24 hours, Dec 2024", clicks: "2.26K", impressions: "129K", ctr: "1.7%", position: "30" },
  { id: "10", img: "/gsc/10-b2b-saas-tool.webp", width: 1200, height: 399, client: "B2B SaaS tool", period: "Last 3 months vs previous 3 months", clicks: "693", impressions: "17.1K", ctr: "4.1%", position: "45.6", note: "Clicks up 47% and CTR up from 2% to 4.1% on the previous 3 months." },
];
