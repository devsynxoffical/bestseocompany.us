/**
 * Location pages (City and State Page Plan, 25 Nov 2026).
 *
 * Rules for every record:
 * - Every number comes from a public source that is linked on the page (`facts[].source`).
 * - No offices, addresses, clients or reviews are claimed. We serve these areas remotely,
 *   so pages use Service schema with areaServed, never LocalBusiness.
 * - Do not add RankEmpire's 29 cities (see RANKEMPIRE_CITIES below).
 * - Copy must stay at least 60 percent unique against sibling pages (npm run seo:uniq).
 */

export type Source = { label: string; url: string };
export type Fact = { stat: string; text: string; source: Source };
export type IndustryMatch = { slug: string; why: string };
export type FAQ = { q: string; a: string };

export type LocationPage = {
  slug: string;               // URL segment: "texas", or "{city}-{st}" for cities
  kind: "state" | "city";
  name: string;               // "Texas" or "New Orleans"
  state: string;              // full state name
  abbr: string;               // "TX"
  keyword: string;            // primary keyword, e.g. "seo company texas"
  title: string;              // 60 characters or fewer
  metaDescription: string;    // 160 characters or fewer
  h1: string;
  answer: string;             // 60 to 100 word answer block
  marketIntro: string;
  facts: Fact[];              // 3 or more, each with a source URL
  industries: IndustryMatch[];// exactly 3 industry slugs that fit the local economy
  searchNotes: { title: string; body: string }[]; // how people in this area search
  offer: { title: string; body: string; href: string }[]; // what you get, linked to /services
  areas: string[];            // text only (no extra URLs)
  areasNote: string;
  cities: string[];           // slugs of live city pages in this state (none yet)
  neighbors: string[];        // slugs of neighboring live location pages
  faqs: FAQ[];                // 4 to 6
  updated: string;            // ISO date
};

/** RankEmpire owns these city keywords. Never build them on this site. */
export const RANKEMPIRE_CITIES = [
  "atlanta", "austin", "baltimore", "boston", "brooklyn", "charlotte", "chicago", "columbus", "dallas", "denver",
  "fort-worth", "houston", "kansas-city", "las-vegas", "los-angeles", "manhattan", "miami", "milwaukee", "nashville",
  "new-york", "orlando", "philadelphia", "phoenix", "sacramento", "san-diego", "san-francisco", "seattle", "tampa", "washington-dc",
];

const SBA_TX: Source = { label: "U.S. SBA Office of Advocacy, 2025 Small Business Profile: Texas", url: "https://advocacy.sba.gov/wp-content/uploads/2025/06/Texas_2025-State-Profile.pdf" };
const SBA_CA: Source = { label: "U.S. SBA Office of Advocacy, 2025 Small Business Profile: California", url: "https://advocacy.sba.gov/wp-content/uploads/2025/06/California_2025-State-Profile.pdf" };
const CENSUS_TX_CA: Source = { label: "U.S. Census Bureau QuickFacts: California; Texas", url: "https://www.census.gov/quickfacts/fact/table/CA,TX/" };

export const locationPages: LocationPage[] = [
  {
    slug: "texas",
    kind: "state",
    name: "Texas",
    state: "Texas",
    abbr: "TX",
    keyword: "seo company texas",
    title: "SEO Company in Texas | Best SEO Company",
    metaDescription: "SEO company for Texas businesses: local SEO, Google Business Profile, technical fixes and content. Plans from $1,500 a month. Get a free 40-point audit.",
    h1: "SEO Company in Texas",
    answer:
      "Best SEO Company helps Texas contractors, clinics, restaurants and other local businesses rank on Google and in the map pack across the cities they serve. A plan covers local SEO, your Google Business Profile, technical fixes and new service and city pages. Plans start at $1,500 a month, month to month after a 90-day start. Most Texas businesses see map pack movement within weeks and steady lead growth in three to six months.",
    marketIntro:
      "Texas is one of the largest small business economies in the country, and it keeps growing. That means more customers searching every year, and more competitors fighting for the same few spots in Google's map pack.",
    facts: [
      { stat: "3.5 million", text: "small businesses operate in Texas, 99.8 percent of all businesses in the state.", source: SBA_TX },
      { stat: "5.1 million", text: "Texans work for a small business, 44.4 percent of the state's employees.", source: SBA_TX },
      { stat: "About 429,000", text: "small firms work in construction, nearly level with professional, scientific and technical services at about 430,000.", source: SBA_TX },
      { stat: "About 769,000", text: "people work at small health care and social assistance businesses, the largest small business workforce of any Texas sector, with accommodation and food services next at about 735,000.", source: SBA_TX },
      { stat: "31,290,831", text: "people lived in Texas on July 1, 2024, up from 29,145,505 at the 2020 census.", source: CENSUS_TX_CA },
    ],
    industries: [
      { slug: "contractor-seo", why: "Construction is one of the two biggest small business sectors in Texas by number of firms, so contractors compete hard for every \"near me\" search." },
      { slug: "medical-seo", why: "Health care employs more small business workers than any other Texas sector. Clinics and practices win new patients through Maps and reviews." },
      { slug: "restaurant-seo", why: "Accommodation and food services is the second largest small business workforce in the state, and diners choose from the map pack in seconds." },
    ],
    searchNotes: [
      { title: "Cities, not one market", body: "A business in a growing Texas metro usually serves a dozen suburbs, and Google ranks each one separately. We track your position across the towns you actually serve and build a page for each main one, with local details rather than a swapped city name." },
      { title: "The map pack decides most calls", body: "For urgent services such as AC repair, plumbing or urgent care, people call one of the first three businesses in Google Maps. Categories, service areas, photos and a steady flow of reviews matter more here than anything else on the page." },
      { title: "Bilingual searches", body: "If you serve Spanish-speaking customers, a Spanish version of your key service pages and a profile that answers questions in both languages can open searches your competitors ignore." },
      { title: "Fast growth means new competitors", body: "New neighborhoods bring new businesses as well as new customers. Rankings that were safe two years ago need fresh content, reviews and links to hold their place." },
    ],
    offer: [
      { title: "Local SEO across your service area", body: "Map pack tracking on a grid of your Texas service area, location pages for the towns that matter and citations in trusted directories.", href: "/services/local-seo" },
      { title: "Google Business Profile", body: "Categories, services, photos, weekly posts and a review process that keeps new reviews coming in from every town you serve.", href: "/services/google-business-profile-seo" },
      { title: "Technical SEO", body: "Speed, mobile layout and indexing fixes, so every page you build can actually rank.", href: "/services/technical-seo" },
      { title: "Content that answers buyers", body: "Service pages and guides written around what Texas customers search for, from pricing questions to emergency services.", href: "/services/small-business-seo" },
    ],
    areas: ["The Woodlands", "Frisco", "Plano", "Round Rock", "Sugar Land", "McKinney", "El Paso", "Lubbock", "Corpus Christi", "Waco"],
    areasNote: "We work with businesses anywhere in Texas. These are some of the areas we can target for you:",
    cities: [],
    neighbors: ["california"],
    faqs: [
      { q: "How much does SEO cost for a Texas business?", a: "Our plans start at $1,500 a month for one location and $3,500 a month for businesses competing in several Texas cities. Larger and multi-location programs are priced to scope. After a 90-day start, every plan is month to month." },
      { q: "Do you have an office in Texas?", a: "No. We work remotely with Texas businesses, the same way we work with clients in other states. Strategy calls, reports and audits all happen online, and we never list a fake address on your profile or ours." },
      { q: "Can you help me rank in several Texas cities?", a: "Yes. Map pack rankings change from one suburb to the next, so we track your position in each town you serve and build a location page with real local detail for the main ones. The Growth plan is built for this." },
      { q: "How long does SEO take for a business in Texas?", a: "Google Business Profile and review improvements can lift map pack visibility within a few weeks. New city and service pages usually take three to six months to rank steadily, and busy metros take longer than smaller towns." },
      { q: "Which Texas businesses do you work with?", a: "Mostly local service businesses such as contractors, HVAC companies, plumbers, clinics, law firms and restaurants, plus online stores and SaaS companies selling to Texas customers." },
    ],
    updated: "2026-11-25",
  },
  {
    slug: "california",
    kind: "state",
    name: "California",
    state: "California",
    abbr: "CA",
    keyword: "seo company california",
    title: "SEO Company in California | Best SEO Company",
    metaDescription: "SEO company for California businesses: local SEO, technical SEO, content and AI search visibility. Plans from $1,500 a month. Start with a free SEO audit.",
    h1: "SEO Company in California",
    answer:
      "Best SEO Company works with California law firms, accountants, architects, clinics and other businesses that need to stand out in some of the most crowded search results in the country. You get local SEO, technical fixes, content and AI search visibility in one plan. Pricing starts at $1,500 a month with no long contract after the first 90 days. Expect early movement in weeks and steady growth in three to six months, longer in the biggest metros.",
    marketIntro:
      "California has about 4.3 million small businesses, and the largest group of them sell professional services. Search results here are dense with established competitors, so a clear plan and steady execution matter more than quick tricks.",
    facts: [
      { stat: "4.3 million", text: "small businesses operate in California, 99.8 percent of all businesses in the state.", source: SBA_CA },
      { stat: "7.6 million", text: "Californians work for a small business, 47.4 percent of the state's employees.", source: SBA_CA },
      { stat: "86,885", text: "net new jobs came from small businesses between March 2023 and March 2024, 99.7 percent of the state's net job growth.", source: SBA_CA },
      { stat: "About 703,000", text: "small businesses work in professional, scientific and technical services, the largest sector by number of small firms.", source: SBA_CA },
      { stat: "39,431,263", text: "people lived in California on July 1, 2024, the largest state population in the country.", source: CENSUS_TX_CA },
    ],
    industries: [
      { slug: "law-firm-seo", why: "Legal services sit in California's largest small business sector, professional, scientific and technical services, and legal searches are among the most competitive on Google." },
      { slug: "accountant-seo", why: "Accounting and tax firms are part of the same professional services sector. Clients compare firms on trust signals such as reviews, credentials and clear answers to tax questions." },
      { slug: "architect-seo", why: "Architecture firms are professional services too. Project pages with photos and locations help them win the commercial and residential searches that lead to bigger jobs." },
    ],
    searchNotes: [
      { title: "Crowded results reward depth", body: "In the busiest California markets, page one is full of firms that have been publishing for years. Thin pages do not move. We build fewer, stronger pages that answer the questions clients actually ask, then earn links to them." },
      { title: "Professional buyers research first", body: "People hiring a lawyer, an accountant or an architect read several pages before they call. Credentials, clear pricing guidance and real examples of work turn that research into an inquiry." },
      { title: "AI answers are already in play", body: "Many California buyers now start with AI Overviews or ChatGPT. Clear answers, consistent business details everywhere and structured data help AI tools describe and recommend your business correctly." },
      { title: "Regional differences", body: "Northern California, the Central Valley and Southern California behave like different markets, with different competitors and price expectations. We plan keywords and pages for the regions you actually serve." },
    ],
    offer: [
      { title: "Local SEO for your region", body: "Map pack tracking, Google Business Profile work and location pages for the cities and regions where your clients are.", href: "/services/local-seo" },
      { title: "Technical SEO", body: "Fast, crawlable pages with clean structured data, so search engines and AI tools understand every service you offer.", href: "/services/technical-seo" },
      { title: "Authority and links", body: "Earned links and mentions from real publications and industry sites, never paid link schemes.", href: "/services/link-building" },
      { title: "AI search visibility", body: "Answer-first content and consistent business details that help you appear in AI Overviews and assistant answers.", href: "/services/answer-engine-optimization" },
    ],
    areas: ["Long Beach", "San Jose", "Oakland", "Fresno", "Irvine", "Santa Barbara", "Bakersfield", "Riverside", "Pasadena", "Santa Rosa"],
    areasNote: "We work with businesses across California. These are some of the areas we can target for you:",
    cities: [],
    neighbors: ["texas"],
    faqs: [
      { q: "How much does SEO cost in California?", a: "Our plans start at $1,500 a month (Starter) and $3,500 a month (Growth), with custom pricing for larger programs. California's most competitive markets often need the Growth plan's extra content and link building to move." },
      { q: "Do you have a California office?", a: "No. We serve California businesses remotely and say so openly. Audits, strategy calls and monthly reports all happen online." },
      { q: "Is SEO worth it for professional services firms in California?", a: "For most firms, yes. Clients research online before they call, and a page that ranks keeps bringing inquiries without paying for every click. In crowded markets it takes longer, so it works best as a steady monthly program." },
      { q: "How long does SEO take in a competitive California market?", a: "Technical and profile fixes can show movement within weeks. Ranking new pages in dense metros usually takes four to six months or more, depending on how established the competitors are." },
      { q: "Can you help us show up in AI search results?", a: "Yes. We write clear answers near the top of your pages, add structured data and keep your business details consistent across the web, which helps AI tools describe your business accurately." },
    ],
    updated: "2026-11-25",
  },
];

export const getLocation = (slug: string) => locationPages.find((p) => p.slug === slug);
export const statePages = () => locationPages.filter((p) => p.kind === "state");
