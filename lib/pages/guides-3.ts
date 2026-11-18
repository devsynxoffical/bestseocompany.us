import type { GuidePage } from "./types";

export const guides3: GuidePage[] = [
  {
    slug: "track-seo-rankings",
    question: "How to track SEO rankings",
    title: "How to Track SEO Rankings: Tools, Methods and Reports",
    metaDescription:
      "Learn how to track SEO rankings with Search Console, rank trackers and local grid tools, plus how to measure AI visibility and what to report each month.",
    primaryKeyword: "how to track seo rankings",
    category: "Measurement",
    readMinutes: 8,
    answer:
      "Track SEO rankings by combining Google Search Console's Performance report, which shows average position from real impressions, with a rank tracker that checks fixed keywords by device and location. Add map-pack grid tracking for local businesses and manual or tool-based checks of AI answers. Report trends monthly, tied to clicks and leads.",
    keyTakeaways: [
      "Search Console shows real impressions and average position, but averages hide detail.",
      "A rank tracker gives fixed, repeatable checks by keyword, device and location.",
      "Local businesses need grid tracking because map rankings change block by block.",
      "Report ranking trends next to clicks, leads and revenue, usually once a month.",
    ],
    sections: [
      {
        heading: "Start with the Search Console Performance report",
        paragraphs: [
          "Google Search Console is free and uses Google's own data, so it is the first place to check rankings. Open the Performance report, select Search results, and turn on the Average position metric alongside clicks, impressions and CTR. Switch to the Queries tab to see which searches triggered your pages, then the Pages tab to see which URLs earned those impressions. Set the date range to at least three months so short swings do not mislead you.",
          "Average position is the mean of your topmost position each time your site appeared in results. A query where you showed at position 3 once and position 15 once averages out to 9, which matches neither real result. Position is also only recorded when an impression happens, so a page that drops off page one may show fewer impressions rather than a worse average. Read position together with impressions and clicks before you draw conclusions.",
          "Use filters to make the data useful. Filter by country to isolate US traffic, by device to compare mobile and desktop, and by page to check a single URL's queries. The compare mode lets you set two date ranges side by side, which is the quickest way to see whether a site update or algorithm change moved your positions.",
        ],
        bullets: [
          "Queries with high impressions and an average position of 8 to 20 are usually your best quick-win targets.",
          "A falling average position with rising impressions often means you started ranking for new, broader terms.",
          "Search Console data is sampled and anonymized for rare queries, so totals will not match keyword-level sums.",
        ],
      },
      {
        heading: "Use a rank tracker for fixed, repeatable checks",
        paragraphs: [
          "A rank tracker checks a fixed list of keywords on a set schedule and records the exact position your page held at that moment. This gives you a clean history for the terms that matter most to the business, even when Search Console has little data for them. Most trackers also show which SERP features appeared, such as a map pack, People Also Ask or an AI Overview, and whether your page owned any of them.",
          "Pick keywords that map to pages and revenue. A tracked set of 50 to 300 keywords is enough for most small and mid-sized businesses if each term ties to a specific page. Group keywords by topic or page so you can see whether a whole cluster is rising or falling, which is more meaningful than one keyword moving two spots.",
          "Rank trackers sample results from a single location and device at a single time, so their numbers will differ from Search Console. Neither is wrong. Search Console tells you what real users saw across many contexts, and the tracker tells you what one controlled check found. You can run a quick spot check any time with our free SEO rank checker.",
        ],
      },
      {
        heading: "Track local and map-pack rankings with a grid",
        paragraphs: [
          "Local rankings change with the searcher's location. A plumber can rank first in the map pack near its office and not appear at all three miles away. A single rank check from the city center hides this, so local businesses need geo-grid tracking that checks the same keyword from many points across the service area.",
          "A grid tool drops a pattern of pins, often a 5x5 or 7x7 layout, over your market and records your map-pack position at each one. The result is a heat map that shows where you are strong and where competitors take over. Run it for your main service keywords plus the category term, such as \"dentist\" or \"roofer\", and repeat it monthly with the same grid size and spacing so results are comparable.",
          "Use the grid to guide work on your Google Business Profile, reviews, location pages and local links. If you are weak on one side of town, a location page, local citations and reviews from customers in that area can help. Grid results move slowly, so judge changes over a few months rather than week to week.",
        ],
      },
      {
        heading: "Account for device, location and personalization",
        paragraphs: [
          "Rankings differ between mobile and desktop because the layouts, features and sometimes the ordering differ. Google indexes the mobile version of your site, and most local and consumer searches happen on phones. Track mobile as your primary view and desktop as a secondary one unless your buyers clearly use desktop.",
          "Location matters even for non-local keywords. A national query can return different results in different states, and city-level differences are common for service terms. Set your rank tracker to the cities or ZIP codes where your customers are, and avoid checking rankings by searching in your own browser.",
          "Your own searches are shaped by your location, history and signed-in state, so they rarely match what a customer sees. If you must check by hand, use a private window, sign out, and confirm the location setting. Treat manual checks as a sanity test and rely on tools for reporting.",
        ],
      },
      {
        heading: "Track visibility in AI answers",
        paragraphs: [
          "Search now includes AI Overviews in Google and answers from assistants such as ChatGPT, Perplexity, Gemini and Copilot. These do not have a classic position, so you track whether your brand is mentioned, whether your pages are cited as a source, and how you are described. Build a fixed list of prompts that match buyer questions, like \"best roofing company in Tampa\" or \"how much does a kitchen remodel cost\".",
          "Run the same prompts on a regular schedule and log mentions, citations, competitors named and the sources each engine used. Answers vary between runs, so run each prompt more than once and look at the share of runs where you appear. Several rank trackers now add AI Overview tracking, and dedicated AI visibility tools cover the chat assistants.",
          "Search Console includes AI Overview and AI Mode traffic inside the normal Performance totals without a separate filter. That means you need your own prompt tracking to see AI visibility directly. Pair it with referral traffic from AI tools in your analytics to see whether mentions turn into visits.",
        ],
      },
      {
        heading: "Compare the main tracking methods",
        paragraphs: [
          "Each method answers a different question, so most businesses use two or three together. The table below summarizes what each one is best for and where it falls short.",
          "A typical setup for a local service business is Search Console for real performance, a rank tracker for 50 to 150 priority keywords, and a monthly grid scan for core map-pack terms. Ecommerce and national sites usually lean more on Search Console and the rank tracker. Add AI visibility tracking once your core pages are in good shape and buyers are likely to ask assistants for recommendations.",
        ],
        table: {
          head: ["Method", "Best for", "Limits", "Typical cadence"],
          rows: [
            ["Google Search Console", "Real impressions, clicks and average position across all queries", "Averages hide detail; rare queries are hidden; data lags by a few days", "Weekly review, monthly report"],
            ["Rank tracker", "Exact positions for a fixed keyword list by device and location", "Single sample per check; costs scale with keyword count", "Daily or weekly checks"],
            ["Local grid tracker", "Map-pack positions across a service area", "Only covers local results; grid settings must stay consistent", "Monthly"],
            ["AI visibility tracking", "Brand mentions and citations in AI Overviews and assistants", "Answers vary between runs; no standard position metric", "Weekly or monthly"],
            ["Manual checks", "Quick sanity tests of a single result", "Personalized and not repeatable", "As needed"],
          ],
        },
      },
      {
        heading: "What to report and how often",
        paragraphs: [
          "Rankings are a leading indicator, so report them next to the outcomes they should drive. A good monthly SEO report shows organic clicks, impressions, leads or sales from organic search, and ranking movement for priority keyword groups. Explain what changed and why, then list the next actions.",
          "Monthly reporting suits most businesses because rankings fluctuate day to day. Weekly checks are useful for spotting problems early, such as a sudden drop after a site change, but they should stay internal. Quarterly reviews are the right time to judge strategy, since content and links often take months to show their full effect.",
          "Keep the report simple and consistent. Use the same keyword groups, locations and date comparisons each month, and compare against the same period last year where seasonality matters. If you want a baseline before you start tracking, our free SEO audit tool and 40-point audit show what is holding rankings back.",
        ],
        bullets: [
          "Organic clicks and conversions, month over month and year over year",
          "Average position and visibility for priority keyword groups",
          "Map-pack grid results for core local terms",
          "AI answer mentions and citations for a fixed prompt set",
          "Pages gaining and losing traffic, with notes on cause",
        ],
      },
    ],
    faqs: [
      {
        q: "Why does my rank tracker show a different position than Search Console?",
        a: "A rank tracker records one check from one location and device at one moment. Search Console averages your top position across every real impression, from many locations and devices. Both are valid, so use the tracker for controlled trends and Search Console for real-world performance.",
      },
      {
        q: "How often should I check my SEO rankings?",
        a: "Let a tool check daily or weekly so you catch sudden drops, but review and report monthly. Day-to-day movement is mostly noise. Judge strategy changes over a quarter or longer.",
      },
      {
        q: "Is average position in Search Console a good KPI?",
        a: "It is useful as a trend for a page or a group of related queries. It is weak as a sitewide KPI because new rankings for broad terms can lower the average while traffic grows. Pair it with clicks and conversions.",
      },
      {
        q: "Can I track rankings for free?",
        a: "Yes. Search Console is free and covers real Google data for your site. For spot checks of specific keywords you can use our free SEO rank checker, then move to a paid tracker when you need scheduled history.",
      },
    ],
    related: [
      "/tools/seo-rank-checker",
      "/guides/best-seo-tools",
      "/guides/seo-keyword-research",
      "/services/local-seo",
    ],
  },
  {
    slug: "seo-keyword-research",
    question: "How to do SEO keyword research",
    title: "How to Do SEO Keyword Research, Step by Step",
    metaDescription:
      "A step-by-step guide to SEO keyword research: find seed topics, read search intent, study the SERP, weigh difficulty and value, and map keywords to pages.",
    primaryKeyword: "seo keyword research",
    category: "How-to",
    readMinutes: 9,
    answer:
      "To do SEO keyword research, start with the words customers use, expand them with keyword tools, and check search intent by studying the results page. Weigh difficulty against business value, group related terms into clusters, and assign each cluster to one page. Add local modifiers and question keywords so pages can answer searches and AI prompts directly.",
    keyTakeaways: [
      "Start from customer language, then use tools to expand and measure it.",
      "The results page tells you the intent and the content format Google prefers.",
      "Prioritize by business value and realistic difficulty before volume.",
      "Map each keyword cluster to a single page to avoid competing with yourself.",
    ],
    sections: [
      {
        heading: "Step 1: Gather seed topics from customers",
        paragraphs: [
          "The best seed keywords come from the people who buy from you. Read sales call notes, support tickets, reviews, emails and chat logs, and write down the exact phrases customers use to describe their problem. Ask your front desk or sales team which questions they hear every week. These phrases often differ from the terms your company uses internally.",
          "List your core services or products, the problems they solve, and the places you serve. Add the questions people ask before buying, such as cost, timing and how to choose a provider. This list of 10 to 30 seed topics becomes the input for every tool you use next.",
          "Check your own data too. Search Console's Queries tab shows searches you already appear for, including terms you never targeted. Site search logs and paid search term reports are also rich sources of real wording.",
        ],
      },
      {
        heading: "Step 2: Expand the list with keyword tools",
        paragraphs: [
          "Run each seed topic through a keyword tool to find variations, related terms and questions. Google Keyword Planner is free with a Google Ads account and gives volume ranges. Third-party tools add estimated volume, difficulty scores, SERP features and the keywords competitors rank for. Google's autocomplete, People Also Ask and related searches are free sources of real phrasing.",
          "Look at competitor domains as well as seed terms. A competitor gap report shows keywords that similar sites rank for and you do not, which is one of the fastest ways to find missing pages. Treat all tool volumes as estimates, since different tools use different data and models.",
          "Export everything into one spreadsheet with columns for keyword, volume, difficulty and current ranking URL if one exists. Remove terms that are irrelevant, such as job searches or free-download queries if you sell a service. A smaller, relevant list is more useful than a huge one.",
        ],
      },
      {
        heading: "Step 3: Identify search intent and analyze the SERP",
        paragraphs: [
          "Search intent is what the searcher wants to get done. Informational searches want an answer, commercial searches compare options, transactional searches want to buy or book, and navigational searches look for a specific brand. A page that does not match the intent will struggle to rank no matter how well it is optimized.",
          "Search each priority keyword and study the first page. Note the page types that rank, such as service pages, blog guides, product pages, directories or videos. Note the SERP features too, including the map pack, People Also Ask, AI Overviews and shopping results. If the top results are all guides, a sales page is unlikely to rank there.",
          "Check what the ranking pages cover and how deep they go. Look at their headings, the questions they answer and whether they come from large brands or small sites like yours. This tells you the format to build and gives a first read on how hard the term will be.",
        ],
        bullets: [
          "Informational: \"how long does a water heater last\"",
          "Commercial: \"best water heater brands\"",
          "Transactional: \"water heater installation near me\"",
          "Navigational: a brand name plus \"login\" or \"phone number\"",
        ],
      },
      {
        heading: "Step 4: Weigh difficulty against business value",
        paragraphs: [
          "Volume and difficulty scores are a starting point, but business value decides priority. A keyword with low volume and high purchase intent can be worth more than a broad term with large volume and no buyers. Score each keyword on how closely it matches what you sell, from high to low.",
          "Judge difficulty by looking at the real competition. Tool scores mostly reflect the links pointing at ranking pages. Also consider whether the ranking sites are national brands, whether they match intent well, and whether your site already has authority on the topic. A new site should lean toward specific, longer queries it can win sooner.",
          "Combine the two views into a simple priority score. High value and achievable difficulty go first. High value and high difficulty become long-term targets supported by content clusters and links. Low value terms are dropped or saved for later.",
        ],
      },
      {
        heading: "Step 5: Cluster keywords and map them to pages",
        paragraphs: [
          "Group keywords that share the same intent and would be satisfied by the same page. A quick test is to compare the top results for two keywords. If many of the same URLs rank for both, they belong in one cluster and one page. If the results are different, they likely need separate pages.",
          "Assign each cluster a primary keyword, a few secondary variations and one target URL. Mark whether the page exists, needs an update or must be created. This keyword map prevents two of your own pages from competing for the same query and shows content gaps clearly.",
          "Add local modifiers where location affects the results. Service businesses should map city and neighborhood terms, such as \"emergency plumber Austin\" or \"plumber in Round Rock\", to the main service page or to genuine location pages with unique content. Avoid near-duplicate city pages that only swap the place name.",
        ],
        table: {
          head: ["Primary keyword", "Secondary keywords", "Intent", "Target URL", "Status", "Priority"],
          rows: [
            ["[main term]", "[2 to 5 close variants]", "[info / commercial / transactional]", "[/page-path]", "[exists / update / new]", "[high / medium / low]"],
            ["[question keyword]", "[related questions]", "Informational", "[/guides/page-path]", "[exists / update / new]", "[high / medium / low]"],
            ["[service + city]", "[service + neighborhood, near me]", "Transactional", "[/services/page-path]", "[exists / update / new]", "[high / medium / low]"],
          ],
        },
      },
      {
        heading: "Step 6: Add question keywords for answer engines",
        paragraphs: [
          "Question keywords start with who, what, why, how, when, how much or can I. They show up in People Also Ask and are the kind of queries AI Overviews and chat assistants answer. Collecting them helps you write pages that give a short, direct answer that an engine can quote.",
          "Pull questions from People Also Ask, autocomplete, forums, review sites and your own customer conversations. Place the most important ones as headings on the relevant page and answer each in the first two or three sentences below it. Longer, detailed questions often deserve their own guide.",
          "Track a fixed set of these questions in AI tools over time to see whether your pages are cited. Question-led content also tends to earn links naturally, because other writers reference clear answers.",
        ],
      },
      {
        heading: "Worked example: a fictional local bakery",
        paragraphs: [
          "This is an illustrative example. The business, location and keyword choices are fictional and include no real search data. Imagine Maple Street Bakery, a small bakery in Columbus, Ohio, that sells custom cakes, wedding cakes and daily pastries. Customers often ask about lead time, cake prices and gluten-free options.",
          "Seed topics from the owner and customer emails include custom birthday cakes, wedding cakes, cake tasting, gluten-free cakes and cupcakes for events. Tool expansion adds variants such as \"custom cakes near me\", \"wedding cake bakery Columbus\" and \"how far in advance to order a wedding cake\". A SERP check shows the map pack and local bakery sites for \"custom cakes Columbus\", while the lead-time question returns guides and People Also Ask boxes.",
          "The bakery maps its clusters to pages. \"Custom cakes Columbus\" and related terms go to a custom cakes page. Wedding cake terms go to a wedding cakes page with a tasting section. The lead-time and cost questions become a short FAQ guide that links to both service pages. Neighborhood terms, such as German Village or Clintonville, are mentioned naturally on the pages and in the Google Business Profile instead of on thin duplicate pages.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many keywords should one page target?",
        a: "One page should target one primary keyword plus its close variants and related questions. If two keywords return mostly the same results, one page can rank for both. If the results differ, plan separate pages.",
      },
      {
        q: "Are keyword volume numbers accurate?",
        a: "No tool shows exact volume. Keyword Planner uses ranges, and third-party tools use estimates that can differ widely. Use volume to compare keywords against each other and avoid treating it as a traffic forecast.",
      },
      {
        q: "How often should I redo keyword research?",
        a: "Review your keyword map every quarter and do a fuller refresh once a year. Also revisit it when you add services, enter new locations or see new queries appear in Search Console.",
      },
    ],
    related: [
      "/guides/best-seo-tools",
      "/guides/best-seo-strategy",
      "/guides/track-seo-rankings",
      "/services/local-seo",
    ],
  },
  {
    slug: "what-is-link-building",
    question: "What is SEO link building?",
    title: "What Is SEO Link Building? Tactics That Follow the Rules",
    metaDescription:
      "SEO link building explained: what backlinks are, what makes a quality link, white-hat tactics that work and which practices break Google's spam policies.",
    primaryKeyword: "seo link building",
    category: "Links",
    readMinutes: 8,
    answer:
      "SEO link building is the work of earning links from other websites to yours. Search engines treat relevant links from trusted sites as a signal that your pages are credible and worth ranking. Good link building uses digital PR, useful content, partnerships and local relationships, and avoids paid or manipulative links that break Google's spam policies.",
    keyTakeaways: [
      "A backlink is a link from another site to yours, and quality matters more than count.",
      "The best links come from relevant, trusted sites that real people read.",
      "Digital PR, resource pages, broken links and local ties are durable tactics.",
      "Paid links must use rel=\"sponsored\"; buying links that pass PageRank breaks Google's rules.",
    ],
    sections: [
      {
        heading: "What backlinks are and why they matter",
        paragraphs: [
          "A backlink is a clickable link on another website that points to a page on yours. Google was built on the idea that links act like citations, and links remain one of the ways search engines discover pages and judge their importance. A page with relevant links from respected sites has an easier time ranking for competitive terms.",
          "Links also send referral traffic and build brand recognition. A mention in a local news story, an industry association directory or a partner's website puts your business in front of people who already trust that source. AI answer engines also lean on the wider web to decide which brands are credible, so being cited by trusted sources supports AI visibility too.",
          "Links are not the only factor. Content quality, relevance, technical health and user experience still decide whether a page deserves to rank. Links amplify a good page. They rarely rescue a weak one.",
        ],
      },
      {
        heading: "What makes a quality link",
        paragraphs: [
          "A quality link comes from a site that is relevant to your business, has its own real audience and was placed because the content is useful. A link from a respected trade publication or your city's chamber of commerce is worth far more than many links from unrelated blogs. Ask whether the link would still be worth having if search engines did not exist.",
          "Placement and context matter. A link inside the body of a relevant article, with natural anchor text, carries more weight than a link in a footer or a long list of unrelated sites. The anchor text should describe the destination naturally, and it should vary across links instead of repeating one exact-match phrase.",
          "Check the linking site before you pursue it. Look for real traffic, original content, a clear topic and an editorial process. Warning signs include sites that publish on any topic for a fee, pages stuffed with outbound links and domains that exist only to sell placements.",
        ],
        bullets: [
          "Relevance: the site covers your industry, location or audience",
          "Trust: the site has real readers, original content and editorial standards",
          "Placement: the link sits in the main content with useful context",
          "Natural anchor text: descriptive and varied, not keyword-stuffed",
          "Editorial choice: someone decided to link because it helps their readers",
        ],
      },
      {
        heading: "White-hat link building tactics",
        paragraphs: [
          "Digital PR earns links by giving journalists and editors something worth covering. That can be original data from your own business, a useful expert comment, a local survey or a clear guide on a timely topic. Pitch it to writers who cover your field and make it easy for them to quote and link to the source.",
          "Resource page and broken-link building work well in most industries. Many sites keep pages that list helpful tools or guides, and a useful resource of yours can earn a place there. Broken-link building finds dead links on relevant pages, then offers your working page as a replacement, which helps the site owner fix a problem.",
          "Relationships produce the most durable links. Partners, suppliers, manufacturers and trade associations often list the businesses they work with. Local sponsorships of teams, events and charities can earn links from community sites when the sponsorship is real and the link is properly tagged where required. Unlinked mentions are another easy win. Find pages that name your brand without linking and ask the author to add a link.",
        ],
        bullets: [
          "Digital PR: original data, expert commentary, newsworthy stories",
          "Resource pages: get useful guides or tools listed on curated pages",
          "Broken-link building: replace dead links with your relevant page",
          "Partnerships: supplier, manufacturer, association and partner listings",
          "Local sponsorships and events: community sites and local news",
          "Unlinked mentions: ask sites that already name you to add a link",
        ],
      },
      {
        heading: "What violates Google's spam policies",
        paragraphs: [
          "Google's spam policies describe link spam as links intended to manipulate rankings. That includes buying or selling links that pass PageRank, which covers paying money, giving free products or exchanging services for a followed link. Paid links are allowed for advertising when they are marked so they do not pass ranking credit.",
          "Private blog networks, or PBNs, are groups of sites built or bought to link to a money site. They often use expired domains with thin or recycled content. Google treats them as link schemes, and sites that rely on them risk losing rankings when the network is detected.",
          "Excessive link exchanges, such as \"link to me and I'll link to you\" arrangements at scale, also count as spam. So do automated links from comment spam, forum profiles and low-quality directories, and large-scale guest posting with keyword-rich anchor text. Google may ignore these links or take manual action against the site, and recovery can take a long time.",
        ],
      },
      {
        heading: "Using rel=\"sponsored\", rel=\"nofollow\" and rel=\"ugc\"",
        paragraphs: [
          "Google supports link attributes that tell it how to treat a link. Use rel=\"sponsored\" for links that are ads, sponsorships or other paid placements. Use rel=\"ugc\" for links inside user-generated content, such as comments and forum posts. Use rel=\"nofollow\" when you do not want to vouch for a link and the other attributes do not fit.",
          "Google treats these attributes as hints, so it may still use the links for discovery. They protect you because they signal that you are not trying to pass ranking credit through a paid or untrusted link. You can combine them, such as rel=\"sponsored nofollow\", if a link fits both cases.",
          "These rules apply to links you receive as well as links you give. If you sponsor an event or pay for a directory listing, the link should carry rel=\"sponsored\" or rel=\"nofollow\". Nofollow and sponsored links still bring traffic and brand exposure, so they can be worth having for their direct value.",
        ],
      },
      {
        heading: "Link building tactics compared by effort and quality",
        paragraphs: [
          "Every tactic trades effort against the quality and risk of the links it produces. Use this table to choose a mix that fits your budget and timeline.",
          "Low-effort tactics like unlinked mentions and partner listings are a good place to start because they rely on relationships you already have. Higher-effort tactics like digital PR take more planning but can earn links from sites that are hard to reach any other way. Avoid any tactic in the high-risk row, since cheap links that break the rules can cost you more than they return.",
        ],
        table: {
          head: ["Tactic", "Effort", "Typical link quality", "Policy risk"],
          rows: [
            ["Digital PR with original data", "High", "High", "Low"],
            ["Unlinked brand mentions", "Low", "Medium to high", "Low"],
            ["Partner and supplier listings", "Low", "Medium", "Low"],
            ["Local sponsorships and events", "Medium", "Medium", "Low if tagged correctly"],
            ["Resource page outreach", "Medium", "Medium", "Low"],
            ["Broken-link building", "Medium to high", "Medium", "Low"],
            ["Paid followed links or PBNs", "Low", "Low", "High, violates spam policies"],
          ],
        },
      },
      {
        heading: "How to measure and run a link building program",
        paragraphs: [
          "Start with a backlink audit. Review the links you already have, the competitors that outrank you and the sites linking to them. Our free backlink checker shows your current link profile, and competitor gaps reveal sites likely to link to businesses like yours.",
          "Set targets around quality and relevance, such as a number of relevant editorial links per quarter. Track referring domains, the pages that receive links, referral traffic and ranking changes for the pages you are supporting. Link building is slow, so judge results over several months.",
          "Point links at pages that deserve them. Strong guides, tools and data pages attract links naturally, and internal links then pass that strength to service pages. If you prefer to hand this off, choose a provider that explains each tactic and refuses to sell links that break Google's rules.",
        ],
      },
    ],
    faqs: [
      {
        q: "How many backlinks do I need to rank?",
        a: "There is no fixed number. It depends on the keyword, the competition and the quality of your content. A few relevant links from trusted sites can matter more than many weak ones.",
      },
      {
        q: "Are nofollow links worthless?",
        a: "No. Google treats nofollow as a hint, and these links still bring referral traffic and brand exposure. A natural link profile includes a mix of followed and nofollow links.",
      },
      {
        q: "Is guest posting allowed?",
        a: "Writing useful articles for relevant sites is fine. Large-scale guest posting done mainly to place keyword-rich links is treated as a link scheme. Write for the audience and keep links natural.",
      },
      {
        q: "What should I do about spammy links pointing to my site?",
        a: "Google usually ignores random low-quality links on its own. Use the disavow tool only if you have a manual action or know of a large set of paid or manipulative links tied to your site.",
      },
    ],
    related: [
      "/services/link-building",
      "/tools/backlink-checker",
      "/guides/best-seo-strategy",
      "/guides/how-to-improve-seo",
    ],
  },
  {
    slug: "real-estate-schema",
    question: "What is SEO schema for real estate?",
    title: "Real Estate Schema for SEO: Types, Example, Mistakes",
    metaDescription:
      "Real estate schema explained: which schema.org types fit agents, brokerages and listings, a JSON-LD example, how to validate it and the mistakes to avoid.",
    primaryKeyword: "real estate schema",
    category: "Technical SEO",
    readMinutes: 8,
    answer:
      "Real estate schema is structured data, usually in JSON-LD, that describes agents, brokerages, listings and events using schema.org types such as RealEstateAgent, Person, SingleFamilyResidence, Offer and Event. Google has no dedicated US listing rich result, so the value lies in clearer entity signals, eligibility for general features like breadcrumbs, and better understanding by AI systems.",
    keyTakeaways: [
      "Use JSON-LD and match every property to content visible on the page.",
      "RealEstateAgent, Person and Organization describe who you are.",
      "Residence types, Place and Offer describe listings; Event covers open houses.",
      "Validate with the Rich Results Test and the Schema Markup Validator.",
    ],
    sections: [
      {
        heading: "Structured data basics and JSON-LD",
        paragraphs: [
          "Structured data is code that labels the facts on a page in a format machines read reliably. It uses the schema.org vocabulary, which defines types such as Person, Organization and Place along with properties like name, address and telephone. Search engines use it to understand who a page is about and how the facts relate.",
          "Google supports three formats, and it recommends JSON-LD. JSON-LD sits in a script tag, usually in the page head, and stays separate from the visible HTML. That makes it easier to add through a CMS, a plugin or a template without touching the page layout.",
          "Structured data has to describe content that users can see on the page. If your markup lists a phone number, review rating or price that is not on the page, it is misleading, and Google can ignore it or take manual action. Treat schema as a description of what the page already shows.",
        ],
      },
      {
        heading: "What schema can and cannot do for real estate",
        paragraphs: [
          "Google does not show a dedicated real estate listing rich result in US search. Adding listing markup will not create special property cards with price and photos in organic results. Be wary of anyone who promises that outcome.",
          "The value is in clarity. Schema tells search engines and AI systems that your page belongs to a specific agent or brokerage, where you operate, who your agents are and which property a page describes. That entity clarity helps connect your website with your Google Business Profile, your agent bios and mentions of you around the web.",
          "Schema also makes pages eligible for general features that Google does support, such as breadcrumbs and organization details like your logo. Google narrowed FAQ rich results to a small set of authoritative government and health sites, so FAQ markup rarely produces a visible feature for real estate. It can still help machines read your Q&A content accurately.",
        ],
      },
      {
        heading: "Useful schema.org types for agents and brokerages",
        paragraphs: [
          "Start with the business entity. RealEstateAgent is a subtype of LocalBusiness on schema.org and fits an individual agent's business or a brokerage office. A larger brokerage can use Organization for the company and RealEstateAgent for each office, each with its own address, phone number and hours.",
          "Use Person for individual agents on bio pages. Include name, jobTitle, image, telephone, email and worksFor to link the agent to the brokerage. Add sameAs links to official profiles, such as the agent's license lookup page or professional profiles, so engines can connect the entity across sites.",
          "Use BreadcrumbList on every page with a clear hierarchy, such as Home, Neighborhoods, Riverside, then a listing. Breadcrumbs help Google show a cleaner URL path and help crawlers understand site structure.",
        ],
        table: {
          head: ["Schema type", "Use it for", "Key properties"],
          rows: [
            ["RealEstateAgent", "Agent business or brokerage office", "name, address, telephone, url, areaServed, openingHours"],
            ["Organization / LocalBusiness", "Parent brokerage or company", "name, logo, url, sameAs, contactPoint"],
            ["Person", "Individual agent bio pages", "name, jobTitle, image, telephone, worksFor, sameAs"],
            ["SingleFamilyResidence / Apartment / Residence", "The property on a listing page", "name, address, numberOfRooms, floorSize, geo"],
            ["Place", "Neighborhood or area pages", "name, geo, address, containedInPlace"],
            ["Offer", "Sale or rental terms on a listing", "price, priceCurrency, availability, businessFunction"],
            ["BreadcrumbList", "Site hierarchy on all pages", "itemListElement with position, name, item"],
            ["FAQPage", "Visible Q&A sections", "mainEntity with Question and acceptedAnswer"],
            ["Event", "Open houses", "name, startDate, endDate, location, organizer"],
          ],
        },
      },
      {
        heading: "Schema for listings, neighborhoods and open houses",
        paragraphs: [
          "For a listing page, describe the property with the most specific residence type that fits. SingleFamilyResidence suits detached homes, Apartment suits a unit, and Residence is the general fallback. Add the address, geo coordinates, number of rooms and floor size as shown on the page.",
          "Describe the sale or rental terms with an Offer that includes price, priceCurrency set to USD and availability. Many sites link the Offer to the property with itemOffered or wrap both in a parent node. Keep prices and status in sync with your listing feed, because stale markup on sold homes sends mixed signals.",
          "Neighborhood and city guide pages can use Place with geo coordinates and a containedInPlace link to the city. Open houses can use Event with a startDate, endDate, location set to the property address and organizer set to the agent. Remove or update the Event once the date passes.",
        ],
      },
      {
        heading: "JSON-LD example for a RealEstateAgent",
        paragraphs: [
          "The example below is for a fictional brokerage office. Replace every value with your own details and make sure each one also appears on the page. Place it inside a script tag with type=\"application/ld+json\".",
          "{\"@context\": \"https://schema.org\", \"@type\": \"RealEstateAgent\", \"name\": \"Example Realty Group\", \"url\": \"https://www.example.com/\", \"logo\": \"https://www.example.com/logo.png\", \"telephone\": \"+1-555-010-0199\", \"address\": {\"@type\": \"PostalAddress\", \"streetAddress\": \"100 Main Street\", \"addressLocality\": \"Springfield\", \"addressRegion\": \"IL\", \"postalCode\": \"62701\", \"addressCountry\": \"US\"}, \"areaServed\": [\"Springfield\", \"Chatham\"], \"openingHours\": \"Mo-Fr 09:00-18:00\", \"sameAs\": [\"https://www.facebook.com/example\"]}",
          "This block names the business, gives its contact details and address, lists the areas it serves and links to an official profile. Add a Person block for each agent on their bio page, with worksFor pointing back to this business, and use the same name, address and phone number as your Google Business Profile.",
        ],
      },
      {
        heading: "How to validate your markup",
        paragraphs: [
          "Test every template before you roll it out. Google's Rich Results Test shows whether a page is eligible for Google-supported rich results, such as breadcrumbs, and flags errors in those types. It can test a live URL or a pasted code snippet and renders the page the way Googlebot sees it.",
          "The Schema Markup Validator at validator.schema.org checks all schema.org types, including ones Google does not use for rich results, such as RealEstateAgent and SingleFamilyResidence. Use it to catch syntax errors, misspelled properties and wrong nesting.",
          "After launch, watch the Enhancements reports in Google Search Console for errors across many pages. Spot check listing pages after feed updates, since a template change can break markup on every listing at once.",
        ],
        bullets: [
          "Rich Results Test: eligibility for Google features and Googlebot rendering",
          "Schema Markup Validator: full schema.org syntax and property checks",
          "Search Console Enhancements: sitewide errors and warnings over time",
        ],
      },
      {
        heading: "Common real estate schema mistakes",
        paragraphs: [
          "The most common problems come from templates and plugins that add markup automatically without anyone checking it. A few small errors repeated across hundreds of listing pages can leave your markup ignored. Review a sample of pages from each template at least once a quarter.",
          "Keep the markup honest and consistent. Your name, address and phone number should match across schema, the page, your Google Business Profile and major directories, which supports the entity clarity that makes schema worth doing.",
        ],
        bullets: [
          "Marking up details that are not visible on the page, such as hidden prices",
          "Adding self-serving review or rating markup for your own business",
          "Leaving sold or expired listings with active Offer markup",
          "Using a generic type when a more specific one fits",
          "Inconsistent business name, address or phone across schema and listings",
          "Duplicate or conflicting blocks from a theme and a plugin at once",
          "Expecting a special listing rich result that Google does not offer in the US",
        ],
      },
    ],
    faqs: [
      {
        q: "Does schema markup improve real estate rankings?",
        a: "Schema is not a direct ranking boost. It helps search engines and AI tools understand your business and pages, and it can make pages eligible for features like breadcrumbs. Rankings still depend on content, links, local signals and site quality.",
      },
      {
        q: "Should IDX listing pages have schema?",
        a: "Yes, if the pages are indexable and show unique, accurate listing details. Many IDX setups add basic markup automatically, so test a few pages to see what is there. Avoid adding markup to thin or duplicate listing pages you do not want indexed.",
      },
      {
        q: "Which schema type should a solo agent use?",
        a: "Use RealEstateAgent for the business on the homepage or contact page, and Person on the bio page. Link them with worksFor or by using the same name and details. If you work under a brokerage, reference it as the parent organization.",
      },
    ],
    related: [
      "/industries/real-estate-seo",
      "/services/technical-seo",
      "/services/local-seo",
      "/tools/seo-audit-tool",
    ],
  },
];
