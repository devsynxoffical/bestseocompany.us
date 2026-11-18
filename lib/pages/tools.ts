import type { ToolPage } from "./types";

export const tools: ToolPage[] = [
  {
    slug: "free-seo-tools",
    name: "Free SEO Tools",
    title: "Free SEO Tools: Audit, Backlinks, Traffic & Ranks",
    metaDescription:
      "Free SEO tools from a US SEO company: an instant SEO audit tool, plus free backlink, website traffic, and keyword ranking reports emailed by our team.",
    primaryKeyword: "free seo tools",
    secondaryKeywords: [
      "free seo checker",
      "seo tools online",
      "free website seo tools",
      "free seo analysis tools",
      "seo toolkit",
    ],
    h1: "Free SEO Tools for US Businesses",
    intro:
      "Four free tools to check how your site is doing in search. The SEO Audit Tool runs right in your browser and checks one page in seconds. The Backlink Checker, Website Traffic Checker, and SEO Rank Checker are free reports our team runs and emails to you.",
    color: "lav",
    mode: "live",
    howItWorks: [
      {
        title: "Pick a tool",
        body: "Choose the instant audit for a quick page check, or request a backlink, traffic, or ranking report.",
      },
      {
        title: "Enter your site",
        body: "Paste a URL for the audit. For reports, add your domain, any keywords or competitors, and your email.",
      },
      {
        title: "Get your results",
        body: "Audit results appear on screen right away. For reports, our team runs them with professional data sources and emails your report.",
      },
    ],
    whatYouGet: [
      {
        title: "Instant SEO audit",
        body: "A live check of one page's technical and on-page basics, from status codes and HTTPS to titles, headings, and structured data.",
      },
      {
        title: "Backlink report",
        body: "Your referring domains, anchor text, most-linked pages, new and lost links, and a review for risky link patterns.",
      },
      {
        title: "Traffic estimate",
        body: "Estimated organic traffic, top ranking keywords and pages, and a comparison with competitors you name.",
      },
      {
        title: "Ranking report",
        body: "Google US positions for your keywords, nationally or for a city, plus map pack positions and SERP features.",
      },
      {
        title: "Plain-English notes",
        body: "Each result explains what it means and why it matters, so you can act on it without SEO jargon.",
      },
      {
        title: "No account needed",
        body: "The tools are free to use. You don't need to sign up or install anything.",
      },
    ],
    explainer: [
      {
        heading: "Which tool should you start with?",
        paragraphs: [
          "Start with the SEO Audit Tool if you want a quick look at a page's health. It catches common problems like missing titles, noindex tags, and missing structured data.",
          "Use the backlink, traffic, and rank reports when you want a wider view. They show who links to you, how much search traffic you may get, and where your keywords rank on Google.",
        ],
      },
      {
        heading: "What free tools can and can't tell you",
        paragraphs: [
          "Free tools are a good first check. They don't replace a full audit of every page, and third-party traffic data is always an estimate. For your own site, Google Search Console and GA4 are the source of truth.",
          "If you want a deeper review, request our free 40-point audit. A person on our team looks at your whole site, your local presence, and your links.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are these SEO tools really free?",
        a: "Yes. The audit tool and the three reports are free. We may follow up by email about our services, and you can opt out at any time.",
      },
      {
        q: "Why do some tools email a report?",
        a: "Backlink, traffic, and ranking data come from professional data sources that we run on your behalf. Our team prepares the report and emails it to you.",
      },
      {
        q: "Does the audit tool check my whole site?",
        a: "No. It checks one URL at a time, plus whether your site has a robots.txt file and an XML sitemap. Run it on your key pages one by one.",
      },
      {
        q: "Can these tools tell me why my rankings dropped?",
        a: "They can point to clues, like a noindex tag, lost links, or lower estimated traffic. Finding the real cause usually needs your Search Console data and a closer review.",
      },
    ],
    related: ["seo-audit-tool", "backlink-checker", "services/technical-seo"],
  },
  {
    slug: "seo-audit-tool",
    name: "Free SEO Audit Tool",
    title: "Free SEO Audit Tool: Check Any Page Instantly",
    metaDescription:
      "Free SEO audit tool that checks a page in seconds: status codes, HTTPS, titles, meta tags, headings, canonical, schema, alt text, robots.txt, and sitemap.",
    primaryKeyword: "free seo audit tool",
    secondaryKeywords: [
      "seo audit tool",
      "website seo checker",
      "free seo checker",
      "on page seo checker",
      "seo analyzer",
    ],
    h1: "Free SEO Audit Tool",
    intro:
      "Enter a URL and get an instant check of that page's technical and on-page SEO basics. The tool runs live through our API and shows results on screen in seconds.",
    color: "pink",
    mode: "live",
    howItWorks: [
      {
        title: "Enter a URL",
        body: "Paste the full address of the page you want to check, such as your homepage or a key service page.",
      },
      {
        title: "We fetch the page",
        body: "Our API requests the page like a browser would, follows any redirects, and reads the HTML that comes back.",
      },
      {
        title: "Review the checks",
        body: "Each check shows a pass, warning, or issue with a short note on what it means and how to fix it.",
      },
    ],
    whatYouGet: [
      {
        title: "Status, redirects, HTTPS, and speed",
        body: "We record the HTTP status code, any redirect chain, whether the page uses HTTPS, the response time, and the page size. A page that errors, redirects in loops, or loads slowly is harder for people and search engines to use.",
      },
      {
        title: "Title tag and meta description",
        body: "We check that both exist and flag lengths that are likely to be cut off in search results. These tags shape how your page looks on Google and whether people click.",
      },
      {
        title: "Headings and content",
        body: "We count H1 tags, show the heading structure, and count words on the page. One clear H1 and logical subheadings help readers and search engines follow the topic.",
      },
      {
        title: "Indexing signals",
        body: "We read the canonical tag, meta robots, and any noindex directive, and check for robots.txt and sitemap.xml on the site. A wrong canonical or a stray noindex can keep a page out of Google entirely.",
      },
      {
        title: "Mobile, language, and social tags",
        body: "We check the viewport tag, the html lang attribute, and Open Graph tags. These affect mobile display, language targeting, and how links look when shared on social platforms.",
      },
      {
        title: "Structured data, images, and links",
        body: "We list the JSON-LD schema types found, measure image alt text coverage, and count internal and external links. Schema can make pages eligible for rich results, alt text helps accessibility, and internal links help Google find your pages.",
      },
    ],
    explainer: [
      {
        heading: "What this audit covers",
        paragraphs: [
          "The tool checks one page's technical and on-page basics. It looks at what's in the HTML and how the server responds. It also checks whether your site has a robots.txt file and an XML sitemap.",
          "It does not check backlinks, rankings, or traffic. It does not crawl your whole site or run a full JavaScript render. For links, traffic, and rankings, use our free report tools.",
        ],
      },
      {
        heading: "How to use the results",
        paragraphs: [
          "Fix issues first, then warnings. A noindex tag or error status on an important page should be fixed right away. A slightly long title is a smaller task.",
          "Run the tool on each of your most important pages. Different templates often have different problems, so checking your homepage alone can miss issues on service or product pages.",
        ],
      },
      {
        heading: "When you need more than a single-page check",
        paragraphs: [
          "Sites with many pages, indexing gaps, or recent traffic drops need a full technical review. Our free 40-point audit covers your whole site, local presence, and links, reviewed by a person on our team.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the SEO audit tool free?",
        a: "Yes. You can run it on any public URL without signing up.",
      },
      {
        q: "Does it audit my whole website?",
        a: "No. It checks one URL per run, plus robots.txt and sitemap.xml at the site level. Run it on each key page to cover your main templates.",
      },
      {
        q: "Why does my page fail even though it looks fine?",
        a: "Many SEO issues live in the code. A missing canonical, a noindex tag, or empty alt text won't show up visually but still affects search.",
      },
      {
        q: "Does a perfect score mean I'll rank?",
        a: "No. These checks cover basics that help Google read your page. Rankings also depend on content quality, links, competition, and many other factors.",
      },
    ],
    related: ["backlink-checker", "seo-rank-checker", "services/technical-seo"],
  },
  {
    slug: "backlink-checker",
    name: "Free Backlink Checker",
    title: "Free Backlink Checker: Get a Backlink Report",
    metaDescription:
      "Free backlink checker: enter your domain and email and our team sends a report on referring domains, anchor text, top linked pages, and new and lost links.",
    primaryKeyword: "free backlink checker",
    secondaryKeywords: [
      "backlink checker",
      "check backlinks",
      "backlink report",
      "referring domains checker",
      "backlink analysis",
    ],
    h1: "Free Backlink Checker",
    intro:
      "Find out who links to your website. Enter your domain and email, and our team emails your report with referring domains, anchor text, top linked pages, and a review of risky patterns.",
    color: "taupe",
    mode: "report",
    howItWorks: [
      {
        title: "Enter your domain",
        body: "Add the domain you want to check and, if you like, a competitor to compare against.",
      },
      {
        title: "Add your email",
        body: "Tell us where to send the report. We use professional backlink data sources to build it.",
      },
      {
        title: "Get your report",
        body: "Our team reviews the data, adds notes, and emails your report.",
      },
    ],
    whatYouGet: [
      {
        title: "Referring domains",
        body: "The number of unique sites linking to you and a list of the strongest ones. Many links from one site count less than links from many relevant sites.",
      },
      {
        title: "Anchor text",
        body: "The clickable words used in links to your site. A natural profile has mostly brand names and URLs, with some descriptive phrases.",
      },
      {
        title: "Top linked pages",
        body: "Which of your pages attract the most links. This shows what content earns attention and where to add internal links.",
      },
      {
        title: "New and lost links",
        body: "Links gained and lost over recent months, so you can spot wins and find links worth recovering.",
      },
      {
        title: "Toxic-pattern review",
        body: "A look for patterns that suggest link schemes, such as obvious link networks or exact-match anchor spam.",
      },
      {
        title: "Next steps",
        body: "Short notes from our team on what the profile shows and what to focus on.",
      },
    ],
    explainer: [
      {
        heading: "What are backlinks?",
        paragraphs: [
          "A backlink is a link from another website to yours. Google uses links to discover pages and as one signal of how trusted a page is.",
          "Quality matters more than quantity. A link from a relevant news site, industry group, or local organization usually counts for more than many links from unrelated or low-quality sites.",
        ],
      },
      {
        heading: "How to read your backlink report",
        paragraphs: [
          "Start with referring domains, since unique linking sites tell you more than total links. Then look at which pages earn links and whether the anchor text looks natural.",
          "Check new and lost links for anything important. If a valuable link disappeared because a page moved, a redirect or a quick email to the site owner may recover it.",
          "Keep in mind that every backlink tool sees only part of the web. Counts differ between tools, and none show every link Google knows about. Search Console's Links report shows a sample from Google's own data.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the backlink checker free?",
        a: "Yes. Enter your domain and email, and our team emails your report at no cost.",
      },
      {
        q: "Why do backlink counts differ between tools?",
        a: "Each tool runs its own crawler and sees a different part of the web. Use any one tool to spot trends and compare sites. Don't treat its count as exact.",
      },
      {
        q: "Should I disavow toxic links?",
        a: "Usually not. Google ignores most spammy links on its own. Disavowing makes sense mainly if you have a manual action or know about past paid links.",
      },
      {
        q: "How do I get more good backlinks?",
        a: "Create content others want to cite, share original data, and build real relationships in your industry and community. Our link building service uses these white-hat methods.",
      },
    ],
    related: ["seo-audit-tool", "website-traffic-checker", "services/link-building"],
  },
  {
    slug: "website-traffic-checker",
    name: "Website Traffic Checker",
    title: "Website Traffic Checker: Free SEO Traffic Report",
    metaDescription:
      "Free website traffic checker and SEO traffic checker. Get estimated organic traffic, top keywords and pages, and a competitor comparison sent by our team.",
    primaryKeyword: "website traffic checker",
    secondaryKeywords: [
      "seo traffic checker",
      "check website traffic",
      "organic traffic checker",
      "competitor traffic checker",
      "website traffic estimator",
    ],
    h1: "Website Traffic Checker",
    intro:
      "See how much organic search traffic a site may get and where it comes from. Enter a domain, add competitors if you like, and our team emails your report.",
    color: "lime",
    mode: "report",
    howItWorks: [
      {
        title: "Enter a domain",
        body: "Add your site or any site you want to check, plus up to a few competitors.",
      },
      {
        title: "Add your email",
        body: "We run the domains through professional SEO data sources that model search traffic.",
      },
      {
        title: "Get your report",
        body: "Our team checks the data, adds context, and emails your report.",
      },
    ],
    whatYouGet: [
      {
        title: "Estimated organic traffic",
        body: "A modeled estimate of monthly visits from Google organic search, with the trend over time.",
      },
      {
        title: "Top ranking keywords",
        body: "The searches the site likely ranks for, with positions and estimated search volume.",
      },
      {
        title: "Top pages",
        body: "The pages estimated to bring in the most organic visits, so you can see what content works.",
      },
      {
        title: "Competitor comparison",
        body: "Side-by-side estimates for your site and the competitors you list.",
      },
      {
        title: "Keyword gaps",
        body: "Searches where competitors appear and your site does not.",
      },
      {
        title: "Context notes",
        body: "Notes from our team on what the estimates suggest and their limits.",
      },
    ],
    explainer: [
      {
        heading: "How traffic checkers estimate traffic",
        paragraphs: [
          "Third-party tools can't see another site's analytics. They estimate traffic by tracking where a site ranks, how many people search each term, and how often people click each position.",
          "This makes the numbers estimates. They can be far off for any single site, especially for small sites, local businesses, and brand searches. They are most useful for comparing sites and spotting trends.",
        ],
      },
      {
        heading: "Your own data is the source of truth",
        paragraphs: [
          "For your own site, use Google Search Console and Google Analytics 4. Search Console shows real clicks and impressions from Google. GA4 shows real visits and conversions.",
          "Use our traffic report to size up competitors and find keyword ideas. Use your own data to measure your results.",
        ],
      },
    ],
    faqs: [
      {
        q: "How accurate is a website traffic checker?",
        a: "It gives estimates based on rankings and search volumes. The numbers can differ a lot from real traffic. Use them for comparisons and trends, and rely on Search Console and GA4 for your own site.",
      },
      {
        q: "Is an SEO traffic checker different from a website traffic checker?",
        a: "People use both terms. Our report focuses on organic search traffic from Google, which is what most SEO traffic checkers measure.",
      },
      {
        q: "Can I check a competitor's traffic?",
        a: "Yes. Add competitor domains and the report compares estimates side by side.",
      },
      {
        q: "Why is my estimated traffic different from GA4?",
        a: "Estimates miss many long-tail and local searches and can't see other channels. GA4 measures actual visits, so trust GA4 for your own site.",
      },
    ],
    related: ["seo-rank-checker", "backlink-checker", "services/google-seo"],
  },
  {
    slug: "seo-rank-checker",
    name: "Free SEO Rank Checker",
    title: "Free SEO Ranking Tool: Keyword Rank Checker",
    metaDescription:
      "Free SEO ranking tool: check keyword positions in Google US, nationally or by city, plus map pack positions and SERP features. Our team emails your report.",
    primaryKeyword: "free seo ranking tool",
    secondaryKeywords: [
      "seo rank checker",
      "keyword rank checker",
      "google rank checker",
      "check keyword ranking",
      "local rank checker",
    ],
    h1: "Free SEO Ranking Tool",
    intro:
      "Find out where your site ranks on Google for the keywords that matter to you. Choose national US results or a specific city, and our team emails your report.",
    color: "lav",
    mode: "report",
    howItWorks: [
      {
        title: "Add your keywords",
        body: "Enter your domain and the keywords you want to track.",
      },
      {
        title: "Pick a location",
        body: "Choose Google US nationally or a city, and add your email.",
      },
      {
        title: "Get your report",
        body: "We check rankings from that location with professional data sources, and our team emails your report.",
      },
    ],
    whatYouGet: [
      {
        title: "Organic positions",
        body: "Where your site ranks for each keyword in Google US results, and which page ranks.",
      },
      {
        title: "City-level results",
        body: "Rankings checked from the city you choose, since local results change by location.",
      },
      {
        title: "Map pack positions",
        body: "Whether your business appears in the local map pack for each keyword, and where.",
      },
      {
        title: "SERP features",
        body: "Which features appear, such as AI Overviews, featured snippets, People Also Ask, and videos.",
      },
      {
        title: "Competing domains",
        body: "The sites that rank above you for your keywords.",
      },
      {
        title: "Quick wins",
        body: "Keywords where you rank just off page one and could move up with focused work.",
      },
    ],
    explainer: [
      {
        heading: "Why rankings look different for different people",
        paragraphs: [
          "Google results change based on the searcher's location, device, language, and past activity. Two people searching the same term in different cities can see very different results, especially for local searches.",
          "That is why searching your own keywords on your phone is not a reliable check. A rank checker uses a neutral search from a set location to give a consistent view.",
        ],
      },
      {
        heading: "How to read your ranking report",
        paragraphs: [
          "Look at the ranking page for each keyword. If the wrong page ranks, Google may be confused about which page covers the topic.",
          "Check SERP features too. A keyword where you rank third below an AI Overview and a map pack may get fewer clicks than the position suggests. For your own average positions over time, Search Console's Performance report uses Google's data.",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is my ranking different when I search myself?",
        a: "Your results are shaped by your location, device, and search history. Our report checks from a set location without personal history, which gives a more consistent view.",
      },
      {
        q: "Can I check rankings for a specific city?",
        a: "Yes. Choose a city and we check results as a searcher there would see them. This matters most for local businesses.",
      },
      {
        q: "What is the map pack?",
        a: "The map pack is the block of local businesses shown with a map for searches with local intent. It is ranked separately from the regular organic results.",
      },
      {
        q: "How is this different from Search Console's average position?",
        a: "Search Console averages your position across all the searches where you appeared. A rank checker shows the position for one keyword in one location at one point in time. Both are useful.",
      },
    ],
    related: ["website-traffic-checker", "seo-audit-tool", "services/local-seo"],
  },
];
