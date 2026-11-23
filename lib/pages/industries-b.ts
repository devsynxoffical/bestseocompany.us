import type { IndustryPage } from "./types";

export const industriesB: IndustryPage[] = [
  {
    slug: "gym-seo",
    name: "Gyms & Fitness Studios",
    audience: "gyms and fitness studios",
    title: "Gym SEO Services | Best SEO Company",
    metaDescription:
      "SEO for gyms and fitness studios. Rank in Google Maps for \"gym near me,\" turn class pages into trial signups and stand out from big-box chains. Free audit.",
    primaryKeyword: "seo for gyms",
    secondaryKeywords: [
      "gym seo",
      "fitness studio seo",
      "gym marketing seo",
      "local seo for gyms",
      "personal training seo",
    ],
    h1: "Gym SEO That Fills Trials and Classes",
    intro:
      "Most people pick a gym within a few miles of home or work, and they start that search on Google Maps. We help independent gyms and boutique studios show up for those searches and turn the visit into a booked trial. Our work covers your Google Business Profile, class and program pages, reviews and the technical basics.",
    color: "lav",
    schemaType: "ExerciseGym",
    challenges: [
      {
        title: "Big chains own the brand searches",
        body: "National franchises have huge link profiles and hundreds of location pages. A local gym can't outspend them, so it has to win on proximity, reviews and specific programs. That means being precise about what you offer and where.",
      },
      {
        title: "Class schedules live in booking apps",
        body: "Many gyms send every class link to Mindbody, Glofox or a similar app. Google can't credit your site for content it never sees. Each program needs its own crawlable page on your domain.",
      },
      {
        title: "Searches are split by training style",
        body: "People search for \"crossfit gym,\" \"24 hour gym\" or \"women's only gym,\" and each phrasing has its own results. A single generic homepage can't rank for all of them. You need pages that match how people describe the training they want.",
      },
      {
        title: "Seasonal demand spikes in January",
        body: "Search interest for gyms jumps around New Year and again before summer. If your pages and profile aren't ready before the rush, competitors take those members. SEO work has to start months ahead of the peak.",
      },
    ],
    searches: [
      { query: "gym near me", intent: "Local" },
      { query: "24 hour gym near me", intent: "Local" },
      { query: "gym membership prices near me", intent: "Cost" },
      { query: "best crossfit gym in austin", intent: "Comparison" },
      { query: "gym with free trial pass", intent: "Commercial" },
      { query: "personal trainer for beginners near me", intent: "Commercial" },
    ],
    playbook: [
      {
        title: "Fix the Google Business Profile",
        body: "We set the right primary category, add amenities like showers or childcare, list hours accurately and upload real photos of the floor. Then we set up a steady routine for posts and review requests.",
      },
      {
        title: "Build program and class pages",
        body: "Each training type, from HIIT to strength to personal training, gets a page with schedule, coach info, pricing range and a trial offer. These pages target the specific phrasing people use.",
      },
      {
        title: "Make the trial easy to claim",
        body: "We put a clear free trial or day pass offer above the fold on every key page and track it as a conversion. A ranking only matters if the visit turns into a walk-in.",
      },
      {
        title: "Earn local links and mentions",
        body: "We pursue links from local races, school sports sponsorships, corporate wellness partners and neighborhood news. These signal to Google that you're a real part of the community.",
      },
    ],
    quickWins: [
      "Add your staffed hours and 24-hour access hours separately so Google shows accurate open times.",
      "Upload fresh photos of equipment, locker rooms and parking to your Google Business Profile.",
      "Create a dedicated page for your free trial or day pass with its own URL and form.",
      "Ask new members for a Google review at the end of their first month, when they're most motivated.",
      "Add LocalBusiness schema with opening hours and amenities to your homepage.",
    ],
    faqs: [
      {
        q: "Can a small gym rank above Planet Fitness or LA Fitness?",
        a: "Yes, for many searches. Google Maps weighs distance, relevance and reviews, so a nearby gym with a strong profile can beat a chain location farther away. Specific searches like \"powerlifting gym\" or \"boxing gym\" are also easier to win than generic ones.",
      },
      {
        q: "Should my class schedule be on my website or in my booking app?",
        a: "Both. Keep booking in your app, but publish a readable schedule and program description on your own site. Google needs that content on your domain to rank you for class-related searches.",
      },
      {
        q: "How long before SEO brings in new members?",
        a: "Profile fixes and review growth can show up in Maps within a few weeks to a couple of months. Program pages and links usually take three to six months to build steady traffic. Starting before January gives you the best shot at the peak.",
      },
      {
        q: "Do I need a separate page for each location?",
        a: "Yes, if you have more than one. Each location needs its own page with address, hours, staff and photos, plus its own Google Business Profile. That's how each one competes in its own neighborhood.",
      },
    ],
    related: ["yoga-studio-seo", "hair-salon-seo", "med-spa-seo"],
  },
  {
    slug: "restaurant-seo",
    name: "Restaurants",
    audience: "restaurants",
    title: "SEO for Restaurants: Get Found on Maps | Best SEO Company",
    metaDescription:
      "Restaurant SEO that gets you found on Google Maps, keeps menus and hours accurate, turns \"food near me\" searches into reservations and orders. Free audit.",
    primaryKeyword: "seo for restaurants",
    secondaryKeywords: [
      "restaurant seo",
      "restaurant local seo",
      "restaurant google maps ranking",
      "restaurant search engine optimization",
    ],
    h1: "SEO for Restaurants and Hungry Local Searchers",
    intro:
      "Diners decide fast, usually from a phone and usually from the Google Maps results. Our SEO for restaurants helps you show up there with accurate menus, hours, photos and reviews that make the choice easy. Then we make sure your own website backs it up and captures direct orders and reservations.",
    color: "pink",
    schemaType: "Restaurant",
    challenges: [
      {
        title: "Third-party sites outrank your own",
        body: "Yelp, DoorDash, Tripadvisor and OpenTable often rank above a restaurant's own website. Those platforms take a cut of every order. Getting your site and profile to the top keeps more of that revenue in house.",
      },
      {
        title: "Menus are often PDFs or images",
        body: "A menu uploaded as a scanned PDF or photo is hard for Google to read. That means you miss searches for specific dishes like \"birria tacos\" or \"gluten free pizza.\" An HTML menu fixes this.",
      },
      {
        title: "Wrong hours cost real customers",
        body: "Holiday hours, seasonal closures and kitchen cutoffs change often. When Google shows the wrong time, people show up to a locked door and leave a bad review. Keeping listings in sync across platforms takes routine effort.",
      },
      {
        title: "Reviews move quickly and publicly",
        body: "Restaurants collect reviews faster than most businesses, both good and bad. Unanswered complaints sit at the top of your profile for everyone to see. Response habits matter as much as review volume.",
      },
    ],
    searches: [
      { query: "restaurants near me", intent: "Local" },
      { query: "best tacos near me", intent: "Comparison" },
      { query: "italian restaurant open now", intent: "Local" },
      { query: "restaurant with private dining room", intent: "Commercial" },
      { query: "brunch reservations this sunday", intent: "Commercial" },
      { query: "vegan options downtown denver", intent: "Research" },
    ],
    playbook: [
      {
        title: "Clean up every listing",
        body: "We audit your Google Business Profile, Apple Maps, Yelp and delivery listings for matching name, address, phone and hours. Then we set the right cuisine categories and attributes like outdoor seating or takeout.",
      },
      {
        title: "Rebuild the menu as real content",
        body: "We turn your menu into crawlable HTML with dish names, short descriptions and dietary notes. We add Menu schema so Google can understand it.",
      },
      {
        title: "Drive direct orders and bookings",
        body: "We make your own ordering link and reservation button the most visible action on your profile and site. That moves traffic away from commission-based apps where possible.",
      },
      {
        title: "Build a review and photo routine",
        body: "We set up simple ways to ask happy guests for reviews and a weekly habit of replying. We also add fresh dish and dining room photos so your profile looks current.",
      },
    ],
    quickWins: [
      "Replace your PDF menu with an HTML menu page that lists each dish by name.",
      "Set holiday hours in your Google Business Profile at least a week ahead of each holiday.",
      "Add your own online ordering link as the primary order option in your profile.",
      "Reply to every review from the last 90 days, starting with the negative ones.",
      "Create a private events or catering page if you offer either service.",
    ],
    faqs: [
      {
        q: "Why does Yelp or DoorDash rank above my website?",
        a: "Those sites have enormous authority and many pages about local restaurants. You can still rank alongside or above them for your own name and specific dishes by improving your site content and Google profile. Your Maps listing is usually the faster win.",
      },
      {
        q: "Does my menu really affect SEO?",
        a: "Yes. When your menu is readable text, Google can match you to searches for specific dishes and diets. A scanned image gives it almost nothing to work with.",
      },
      {
        q: "Should I respond to bad reviews?",
        a: "Yes, briefly and calmly. Thank them, acknowledge the issue and offer to make it right offline. Future diners read your replies as closely as the complaint.",
      },
      {
        q: "We have three locations. How should the site be set up?",
        a: "Give each location its own page with address, hours, menu differences, parking and a map. Each location also needs its own Google Business Profile. That lets each one rank in its own neighborhood.",
      },
    ],
    related: ["cafe-seo", "hotel-seo", "event-planner-seo"],
  },
  {
    slug: "saas-seo",
    name: "SaaS",
    audience: "SaaS companies",
    title: "SaaS SEO Agency | Best SEO Company",
    metaDescription:
      "SaaS SEO built around product-led content, comparison and alternative pages, integration pages and docs that rank. Grow signups from search. Free audit.",
    primaryKeyword: "saas seo",
    secondaryKeywords: [
      "saas seo agency",
      "b2b saas seo",
      "seo for software companies",
      "saas content marketing",
      "seo for startups",
    ],
    h1: "SaaS SEO That Drives Signups and Pipeline",
    intro:
      "SaaS buyers research for weeks before they talk to sales. They compare tools, read alternatives pages and check whether you integrate with what they already use. We build the pages that show up at each of those moments and connect them to trials, demos and pipeline.",
    color: "taupe",
    schemaType: "Organization",
    challenges: [
      {
        title: "Traffic that never converts",
        body: "Many SaaS blogs rank for broad topics that attract students and job seekers. The traffic looks good in reports but rarely starts a trial. Content has to tie back to the problem your product solves.",
      },
      {
        title: "Competitors own the comparison pages",
        body: "When someone searches \"your brand vs competitor,\" the top result is often your competitor's page or a review site. If you don't publish your own fair comparison, someone else frames it for you.",
      },
      {
        title: "Product pages are thin or gated",
        body: "Features, integrations and docs often sit behind logins or in JavaScript-heavy apps. Google can't rank what it can't render. A lot of useful content goes unseen.",
      },
      {
        title: "AI answers shortlist vendors",
        body: "Buyers now ask ChatGPT, Perplexity and Google AI Overviews for tool recommendations. Those answers pull from review sites, comparison articles and clear product pages. If your positioning is vague, you're left off the shortlist.",
      },
    ],
    searches: [
      { query: "best project management software for agencies", intent: "Comparison" },
      { query: "asana alternatives", intent: "Comparison" },
      { query: "hubspot vs salesforce for small business", intent: "Comparison" },
      { query: "how to automate invoice approvals", intent: "Research" },
      { query: "slack integration for crm", intent: "Commercial" },
      { query: "crm pricing per user", intent: "Cost" },
    ],
    playbook: [
      {
        title: "Map keywords to the funnel",
        body: "We sort search demand into problem, solution, comparison and brand stages. Then we prioritize the pages closest to a buying decision before writing top-of-funnel content.",
      },
      {
        title: "Ship comparison and alternatives pages",
        body: "We build honest \"vs\" and \"alternatives\" pages with real feature tables and clear use cases. These pages often convert better than anything on the blog.",
      },
      {
        title: "Scale integration and use-case pages",
        body: "We create a templated page for each integration and key use case, with real setup details. Done well, this becomes a large set of pages that each match a specific search.",
      },
      {
        title: "Open up docs and earn authority",
        body: "We make help docs and API references crawlable and well linked. Then we pursue links and mentions through original product data, partner co-marketing and expert commentary.",
      },
    ],
    quickWins: [
      "Publish a \"[your brand] vs [top competitor]\" page with a fair, specific feature table.",
      "Move your integrations directory to server-rendered pages with one URL per integration.",
      "Add a short, plain-language product definition to your homepage that AI tools can quote.",
      "Link from every high-traffic blog post to the most relevant feature or signup page.",
      "Make sure your public docs aren't blocked by robots.txt or a login wall.",
    ],
    faqs: [
      {
        q: "Should we write about our competitors by name?",
        a: "Yes, as long as it's accurate and fair. Buyers search for these comparisons and will read someone's version. Publishing your own lets you explain where you fit and who you're best for.",
      },
      {
        q: "How do you measure SEO for a SaaS company?",
        a: "We track organic signups, demo requests and pipeline from organic, along with rankings and traffic. Traffic alone can mislead. We set up attribution so you can see which pages actually start trials.",
      },
      {
        q: "Is programmatic SEO worth it for SaaS?",
        a: "It can be, when every page has real, specific value like integration setup steps or template examples. Thin pages generated from a keyword list tend to get ignored or hurt the site. We test a small batch before scaling.",
      },
      {
        q: "How do we show up in ChatGPT and AI search results?",
        a: "Clear positioning, consistent product descriptions across your site and review profiles, and mentions on trusted third-party sites all help. We audit how AI tools describe you today and fix the gaps. It works alongside traditional SEO.",
      },
    ],
    related: ["financial-services-seo", "accountant-seo", "law-firm-seo"],
  },
  {
    slug: "law-firm-seo",
    name: "Law Firms",
    audience: "law firms and attorneys",
    title: "SEO Services for Lawyers That Bring Real Cases",
    metaDescription: "SEO services for lawyers and law firms: practice area pages, local rankings, reviews and trust signals that bring real case inquiries.",
    primaryKeyword: "seo services for lawyers",
    secondaryKeywords: [
      "best seo agency for lawyers",
      "law firm seo",
      "attorney seo",
      "seo for lawyers",
      "legal seo"
    ],
    h1: "SEO Services for Lawyers That Bring Real Cases",
    intro:
      "People looking for a lawyer usually have an urgent problem and a short list of firms. Our SEO services for lawyers help attorneys earn a spot on that list through strong practice area pages, local rankings and content that answers the questions clients ask first. All of it is written to respect state bar advertising rules.",
    color: "lime",
    schemaType: "LegalService",
    challenges: [
      {
        title: "Directories crowd the results",
        body: "Avvo, FindLaw, Justia and Super Lawyers rank for many legal searches. Firms end up competing against directories and against each other. You need both your own pages and well-managed directory profiles.",
      },
      {
        title: "High competition, high stakes",
        body: "Legal keywords are among the most expensive in paid search, so organic rankings are worth a lot. That also means competitors invest heavily. Shortcuts and spammy links can backfire.",
      },
      {
        title: "Google holds legal content to a high bar",
        body: "Legal topics affect people's lives and money, so Google looks for clear expertise and authorship. Generic articles without an attorney's name and credentials struggle. Content needs to show who wrote or reviewed it.",
      },
      {
        title: "Advertising rules limit what you can say",
        body: "Bar rules restrict claims about results, specialization and comparisons. Many common marketing phrases aren't allowed. Copy has to persuade while staying accurate.",
      },
    ],
    searches: [
      {
        query: "lawyer near me",
        intent: "Local"
      },
      {
        query: "personal injury lawyer [city]",
        intent: "Local"
      },
      {
        query: "divorce attorney near me",
        intent: "Local"
      },
      {
        query: "criminal defense lawyer",
        intent: "Service"
      },
      {
        query: "estate planning attorney",
        intent: "Service"
      },
      {
        query: "free consultation lawyer",
        intent: "Commercial"
      }
    ],
    playbook: [
      {
        title: "Practice area pages",
        body: "A detailed page for each practice area."
      },
      {
        title: "Attorney bios",
        body: "Attorney bio pages with credentials and bar admissions."
      },
      {
        title: "Location pages",
        body: "Location pages for each office and service city."
      },
      {
        title: "Guides and links",
        body: "Helpful legal guides that answer common questions, and links from legal directories, bar associations and local media."
      }
    ],
    quickWins: [
      "Add bar admissions and credentials to every attorney bio.",
      "Give each practice area its own page.",
      "Claim your profiles on major legal directories.",
      "Make the free consultation offer easy to find.",
      "Reply professionally to every Google review."
    ],
    compliance:
      "Attorney advertising is governed by state bar rules, most of which follow ABA Model Rule 7.1, which bars false or misleading communications about a lawyer's services. Many states also restrict claims of specialization, past-result statements and testimonials, and some require disclaimers or filing of ads. We write conservatively and recommend your firm review content against your state's rules before publishing.",
    faqs: [
      {
        q: "What is law firm SEO?",
        a: "It is the process of helping law firms rank in Google search and Maps for their practice areas and locations, through strong practice pages, attorney credentials, reviews and local authority."
      },
      {
        q: "Does SEO work for lawyers?",
        a: "Yes. Most people search online before choosing a lawyer, and ranking for practice area and location searches brings in case inquiries without paying per click."
      },
      {
        q: "How much does SEO cost for a law firm?",
        a: "Law firm SEO usually costs more than other industries because competition is high. Price depends on practice areas, cities and content needs."
      },
      {
        q: "What makes the best SEO agency for lawyers?",
        a: "Experience with legal SEO, respect for bar advertising rules, clear deliverables, transparent reporting and a focus on case inquiries, not just traffic."
      },
      {
        q: "How long does law firm SEO take?",
        a: "Local and niche practice areas can improve in a few months. Competitive areas like personal injury in large cities often take six to twelve months."
      },
      {
        q: "Are legal directories good for SEO?",
        a: "Trusted legal directories provide citations, links and referral traffic. They work best alongside a strong website and Google Business Profile."
      }
    ],
    related: ["car-accident-lawyer-seo", "mass-tort-seo", "accountant-seo", "personal-injury-seo"],
    localProof: [
      { title: "Consultations by practice area", body: "Calls and form submissions from search, split by practice area so you see which pages bring cases." },
      { title: "Map pack rank by city", body: "Where your firm shows for searches like \"car accident lawyer near me\" across the cities you serve." },
      { title: "Practice pages on page one", body: "Which practice area and city pages rank in the top 10, and which competitor firms sit above them." },
      { title: "Reviews and ratings", body: "New Google reviews each month, kept within bar rules on testimonials." },
    ],
    challengesIntro: "Legal search is among the most competitive on Google. Large directories and big firms dominate many results, and Google holds legal content to a high standard for trust and expertise. Law firm SEO needs strong practice area pages, attorney credentials and local authority.",
    mapPackCopy: "People searching for a lawyer often pick from the map pack. We optimize your Google Business Profile for each practice area, add attorney photos and office details, and build pages for the cities and courts you serve, using the same [local SEO](/services/local-seo) system behind all our local work.",
    includedCopy: "Practice area keyword research, technical fixes, Google Business Profile management, practice and location pages, legal content, legal directory citations, review strategy and a monthly report on rankings and case inquiries. All content respects state bar advertising rules. Injury firms should also see [SEO for personal injury lawyers](/industries/personal-injury-seo), and solo practices can start with our [SEO services for small business](/services/small-business-seo).",
  },
  {
    slug: "med-spa-seo",
    name: "Med Spas",
    audience: "med spas",
    title: "Med Spa SEO Services | Best SEO Company",
    metaDescription:
      "Med spa SEO for Botox, fillers, laser and skin treatments. Treatment pages, local Maps rankings and compliant before-and-after content. Free audit.",
    primaryKeyword: "med spa seo",
    secondaryKeywords: [
      "medical spa seo",
      "seo for med spas",
      "aesthetic clinic seo",
      "med spa marketing",
      "botox clinic seo",
    ],
    h1: "Med Spa SEO for Booked Treatment Calendars",
    intro:
      "Med spa clients research treatments carefully before they book. They want to know what a procedure involves, who performs it and what it costs. Our med spa SEO helps you rank for those treatment searches and build pages that answer the questions that lead to a consultation.",
    color: "lav",
    schemaType: "HealthAndBeautyBusiness",
    challenges: [
      {
        title: "Every treatment is its own market",
        body: "Botox, lip filler, laser hair removal and microneedling each have their own searches and competitors. A single services page can't rank for all of them. Each treatment needs dedicated content.",
      },
      {
        title: "Medical content needs credibility",
        body: "Google treats aesthetic treatments as health topics. Pages need clear information about providers, credentials and medical oversight. Thin marketing copy tends to underperform.",
      },
      {
        title: "Photos come with privacy rules",
        body: "Before-and-after photos are the most persuasive content you have. Using them requires written patient consent and careful handling. Many spas skip them entirely out of caution.",
      },
      {
        title: "Brand-name terms need care",
        body: "People search for brand names like Botox, Juvederm or CoolSculpting. Manufacturers have guidelines on how their trademarks are used. Pages need to use those names accurately.",
      },
    ],
    searches: [
      { query: "botox near me", intent: "Local" },
      { query: "how much is lip filler", intent: "Cost" },
      { query: "laser hair removal vs electrolysis", intent: "Comparison" },
      { query: "microneedling downtime", intent: "Research" },
      { query: "best med spa in scottsdale", intent: "Comparison" },
      { query: "hydrafacial deals this month", intent: "Commercial" },
    ],
    playbook: [
      {
        title: "Create a page for every treatment",
        body: "Each treatment gets a page covering how it works, who it suits, recovery, pricing range and the provider who performs it. These pages match the way clients research.",
      },
      {
        title: "Strengthen provider trust signals",
        body: "We build provider bios with licenses and training, and name the medical director. This supports both Google's quality expectations and client confidence.",
      },
      {
        title: "Dominate local Maps results",
        body: "We optimize your Google Business Profile with treatment services, real interior photos and a review routine. We help you ask happy clients for reviews without sharing protected details.",
      },
      {
        title: "Use visuals the right way",
        body: "We help set up a consent process for before-and-after photos and display them with proper context. Where photos aren't possible, we use treatment explainers and FAQs instead.",
      },
    ],
    quickWins: [
      "Split your services page into separate pages for your top five treatments.",
      "Add a starting price or price range to each treatment page.",
      "Name your medical director and list provider credentials on the about page.",
      "Add a \"what to expect\" section covering prep, the appointment and recovery.",
      "Add treatment services to your Google Business Profile with short descriptions.",
    ],
    compliance:
      "Med spas that handle patient health information are generally covered by HIPAA, so reviews, testimonials and photos need care. Use written patient authorization before publishing before-and-after photos or identifiable stories, and never confirm someone is a patient when replying to reviews. State rules on medical advertising and supervision also vary, and brand names like Botox should follow the manufacturer's trademark guidance.",
    faqs: [
      {
        q: "Can we post before-and-after photos on our website?",
        a: "Yes, with signed patient consent that covers online use. Remove identifying details where you can and note that results vary. We recommend your compliance or legal advisor approve the consent form.",
      },
      {
        q: "How should we respond to reviews without breaking HIPAA?",
        a: "Keep replies general and never confirm the person was a patient or mention treatment details. Thank them and invite them to contact the office directly. This applies to positive reviews too.",
      },
      {
        q: "Should we list prices on the website?",
        a: "Starting prices or ranges help a lot. People search for treatment costs, and pages that answer that question tend to earn more clicks and better-qualified consultations. You can still note that final pricing depends on the consultation.",
      },
      {
        q: "We're in a strip of competing med spas. How do we stand out?",
        a: "Specific treatment pages, visible provider credentials and a strong review count are the main levers. Many competitors rely on one generic services page. Depth on each treatment usually wins.",
      },
    ],
    related: ["plastic-surgeon-seo", "hair-salon-seo", "medical-seo"],
  },
  {
    slug: "plumber-seo",
    name: "Plumbers",
    audience: "plumbing companies",
    title: "SEO for Plumbers: More Service Calls From Google",
    metaDescription: "SEO for plumbers that brings emergency and service calls. Map pack rankings, service pages and reviews built for plumbing companies.",
    primaryKeyword: "seo for plumbers",
    secondaryKeywords: [
      "plumber seo",
      "plumbing seo services",
      "plumbing seo",
      "local seo for plumbers"
    ],
    h1: "SEO for Plumbers Who Want More Service Calls",
    intro:
      "When a pipe bursts, people call one of the first three plumbers they see on Google. Our SEO for plumbers helps plumbing companies earn those spots for emergency and planned work. Our focus is on the calls that pay: water heaters, drains, repipes and sewer lines.",
    color: "pink",
    schemaType: "Plumber",
    challenges: [
      {
        title: "Emergency calls go to the top three",
        body: "Someone with a flooded basement rarely scrolls. They call whoever shows first in the map pack. Ranking fourth is close to invisible for urgent searches.",
      },
      {
        title: "Service areas are bigger than your address",
        body: "Plumbers serve whole metro areas, but Google Maps favors businesses close to the searcher. Ranking in suburbs away from your shop takes deliberate work. Fake addresses aren't the answer and can get your listing suspended.",
      },
      {
        title: "Lead-gen sites and Local Services Ads",
        body: "Angi, HomeAdvisor and Google's own Local Services Ads take up space above organic results. You need to show up in several places at once. Organic rankings still drive a large share of calls.",
      },
      {
        title: "Generic service pages don't rank",
        body: "Many plumbing sites list a dozen services on one page. Google can't tell you're the best match for \"tankless water heater install\" from a bullet point. Each profitable service needs its own page.",
      },
    ],
    searches: [
      {
        query: "plumber near me",
        intent: "Local"
      },
      {
        query: "emergency plumber",
        intent: "Emergency"
      },
      {
        query: "water heater repair",
        intent: "Service"
      },
      {
        query: "drain cleaning",
        intent: "Service"
      },
      {
        query: "leak detection",
        intent: "Service"
      },
      {
        query: "sewer line repair",
        intent: "Service"
      }
    ],
    playbook: [
      {
        title: "Service pages",
        body: "A page for each service, such as water heaters, drains and leaks."
      },
      {
        title: "Emergency page",
        body: "An emergency service page with 24/7 messaging."
      },
      {
        title: "Service area pages",
        body: "Service area pages for each town."
      },
      {
        title: "Mobile and reviews",
        body: "Fast mobile site with tap-to-call, and review requests after every job."
      }
    ],
    quickWins: [
      "Add \"emergency plumber\" to your services if you offer it.",
      "Make your phone number tap-to-call on every page.",
      "Upload photos from your last 10 jobs to Google.",
      "Create a water heater page with clear pricing guidance.",
      "Ask every customer for a review by text on the same day."
    ],
    compliance:
      "Most states and many cities license plumbers. Show your license number on your site and profile where required, and don't advertise work like gas line or backflow testing unless your license covers it.",
    faqs: [
      {
        q: "What is SEO for plumbers?",
        a: "It is the process of helping plumbing companies rank in Google search and Maps for services like emergency plumbing, water heater repair and drain cleaning in their service area."
      },
      {
        q: "How do plumbers get more calls from Google?",
        a: "Rank in the map pack with a strong Google Business Profile, have a fast mobile site with tap-to-call, build a page for each service and collect reviews after every job."
      },
      {
        q: "How much does plumbing SEO cost?",
        a: "Plumbing SEO is usually a monthly service. Cost depends on the size of your service area and the competition in your city."
      },
      {
        q: "Is SEO or Google Ads better for plumbers?",
        a: "Ads bring calls immediately, while SEO builds lower-cost calls over time. Many plumbers use ads for emergencies and SEO for long-term growth."
      },
      {
        q: "How long does SEO take for plumbers?",
        a: "Local improvements can show within weeks. Strong positions for competitive services usually take three to six months."
      }
    ],
    related: ["hvac-seo", "roofing-seo", "home-services-seo", "electrician-seo"],
    localProof: [
      { title: "Calls from Google by town", body: "Tracked calls from your Google Business Profile and website, split by the suburbs and towns you serve." },
      { title: "Emergency search visibility", body: "Your map pack position for \"emergency plumber near me\" and \"24 hour plumber\" on a geo-grid across your service area." },
      { title: "Booked jobs from search", body: "Calls matched to booked jobs, so you see revenue from SEO, not just clicks." },
      { title: "Review growth", body: "New reviews each month and your rating against the three plumbers above you in the map pack." },
    ],
    challengesIntro: "Plumbing searches are urgent and local. Homeowners call one of the first three businesses they see in Google Maps. Lead marketplaces, ads and large franchises take much of the page, so plumbing SEO has to win the map pack and convert the visitor in seconds.",
    mapPackCopy: "We optimize your Google Business Profile for every plumbing service you offer, add real job photos, publish weekly posts and build service area pages, so you appear for \"plumber near me\" across all the neighborhoods you serve. It is the same [local SEO](/services/local-seo) system we use for [contractors](/industries/contractor-seo).",
    includedCopy: "Plumbing keyword research, Google Business Profile management, service and area pages, technical fixes, citations in home service directories, review strategy and a monthly report on calls and rankings. Smaller shops can start with our [SEO services for small business](/services/small-business-seo).",
  },
  {
    slug: "carpet-cleaning-seo",
    name: "Carpet Cleaning",
    audience: "carpet cleaning companies",
    title: "Carpet Cleaning SEO | Best SEO Company",
    metaDescription:
      "Carpet cleaning SEO to rank in Google Maps for pet stain, upholstery and rug cleaning searches. Service pages, reviews and repeat bookings. Free audit.",
    primaryKeyword: "carpet cleaning seo",
    secondaryKeywords: [
      "seo for carpet cleaners",
      "carpet cleaner seo",
      "carpet cleaning marketing",
      "upholstery cleaning seo",
    ],
    h1: "Carpet Cleaning SEO That Books More Jobs",
    intro:
      "Carpet cleaning is a crowded local market with a lot of low-price ads. Customers compare reviews, photos and prices before they book. We help carpet cleaners rank for the specific jobs people need, from pet stains to area rugs, and build the trust that wins the booking.",
    color: "taupe",
    schemaType: "HomeAndConstructionBusiness",
    challenges: [
      {
        title: "Low-price coupons set expectations",
        body: "Many competitors advertise very low whole-house prices and upsell on site. Customers arrive skeptical of pricing. Clear, honest pricing information becomes a ranking and conversion asset.",
      },
      {
        title: "Franchises compete in every market",
        body: "National carpet cleaning franchises have strong brand recognition and many local pages. An independent cleaner has to win on reviews, specific services and local detail.",
      },
      {
        title: "Specialty services get buried",
        body: "Pet urine treatment, oriental rug cleaning, tile and grout and upholstery all have their own searches. Most sites mention them in passing. Those higher-value jobs go to whoever has a real page for them.",
      },
      {
        title: "Repeat business is underused",
        body: "Carpets need cleaning every year or so, but many companies never follow up. Search brings in a first job. Reviews and reminders turn it into a returning customer.",
      },
    ],
    searches: [
      { query: "carpet cleaning near me", intent: "Local" },
      { query: "pet urine carpet cleaning", intent: "Commercial" },
      { query: "how much does carpet cleaning cost per room", intent: "Cost" },
      { query: "steam cleaning vs dry carpet cleaning", intent: "Comparison" },
      { query: "area rug cleaning pickup and delivery", intent: "Commercial" },
      { query: "same day carpet cleaning", intent: "Emergency" },
    ],
    playbook: [
      {
        title: "Optimize the Maps listing",
        body: "We set accurate categories, list each service, define your service area and add before-and-after photos from real jobs. Then we keep the profile active with posts and new photos.",
      },
      {
        title: "Give specialty services their own pages",
        body: "Pet stains, upholstery, rugs, tile and grout and commercial carpet each get a page. These explain your method, drying time and pricing approach.",
      },
      {
        title: "Be upfront about pricing",
        body: "We help you publish starting prices or per-room pricing with clear notes on what's included. This answers a top search question and filters out bargain hunters.",
      },
      {
        title: "Turn jobs into reviews and repeats",
        body: "We set up review requests after each job and seasonal reminders for past customers. Reviews that mention pets, rugs or stains help you rank for those searches.",
      },
    ],
    quickWins: [
      "Add before-and-after photos of real jobs to your Google Business Profile every week.",
      "Create a dedicated pet odor and stain removal page explaining your treatment.",
      "Publish a simple pricing table with a per-room or starting price.",
      "Add a note about typical drying time to every service page.",
      "Email past customers a reminder about twelve months after their last cleaning.",
    ],
    faqs: [
      {
        q: "How do I compete with the cheap coupon companies?",
        a: "Publish honest pricing, show real results and build reviews that mention no surprise charges. Many customers have been burned by bait pricing. Being clear is a selling point.",
      },
      {
        q: "Should commercial carpet cleaning be on a separate page?",
        a: "Yes. Office managers and property managers search differently than homeowners and care about scheduling and minimal disruption. A separate page lets you speak to them directly.",
      },
      {
        q: "Do photos really help rankings?",
        a: "Photos help most with conversions. A profile with recent, real job photos looks active and trustworthy. That leads to more clicks and calls, which supports your local visibility.",
      },
      {
        q: "We also do tile and upholstery. Should we market those?",
        a: "Yes. They're often higher value per job and have less competition than general carpet cleaning. Each deserves its own page and its own service listing on your profile.",
      },
    ],
    related: ["home-services-seo", "pest-control-seo", "painting-contractor-seo"],
  },
  {
    slug: "locksmith-seo",
    name: "Locksmiths",
    audience: "locksmiths",
    title: "Locksmith SEO Services | Best SEO Company",
    metaDescription:
      "Locksmith SEO for real, licensed locksmiths. Rank in Google Maps above spam listings, pass verification and win lockout and rekey calls. Free audit.",
    primaryKeyword: "locksmith seo",
    secondaryKeywords: [
      "seo for locksmiths",
      "locksmith marketing",
      "locksmith google maps",
      "local seo for locksmiths",
    ],
    h1: "Locksmith SEO for Legitimate Local Shops",
    intro:
      "Locksmith search results are full of fake listings and call centers posing as local shops. That makes it harder for real locksmiths to rank and harder for customers to trust anyone. We help legitimate locksmiths build a profile and website that prove they're real, local and licensed.",
    color: "lime",
    schemaType: "Locksmith",
    challenges: [
      {
        title: "Spam listings flood Google Maps",
        body: "Lead-gen operators create fake locksmith listings with made-up addresses to capture calls and sell them on. They push real businesses down the map pack. Reporting them helps, but it doesn't replace building your own strength.",
      },
      {
        title: "Google adds extra verification",
        body: "Because of the spam problem, Google applies stricter checks to locksmiths. That can include video verification and, for Local Services Ads, background and license checks. Any mismatch in your details can stall or suspend a listing.",
      },
      {
        title: "Customers are wary of scams",
        body: "Many people have heard stories of a cheap quote turning into a huge bill. They look for signs of a real business before calling. Clear pricing, photos and reviews matter more than in most trades.",
      },
      {
        title: "Most calls are urgent and mobile",
        body: "Lockouts happen in parking lots and on doorsteps. People search on a phone and call right away. A slow or confusing mobile site loses the job.",
      },
    ],
    searches: [
      { query: "locksmith near me", intent: "Local" },
      { query: "locked out of car help", intent: "Emergency" },
      { query: "24 hour locksmith", intent: "Emergency" },
      { query: "cost to rekey a house", intent: "Cost" },
      { query: "car key replacement near me", intent: "Commercial" },
      { query: "commercial lock installation", intent: "Commercial" },
    ],
    playbook: [
      {
        title: "Get the listing verified and clean",
        body: "We make sure your name, address, phone and website match real signage and paperwork. Then we prepare you for Google's verification steps so the profile holds up.",
      },
      {
        title: "Prove you're a real business",
        body: "We add license numbers, owner and tech photos, shop photos, branded vehicles and a clear address or service area to your site. These trust signals separate you from lead-gen listings.",
      },
      {
        title: "Build pages by service type",
        body: "Residential lockouts, rekeying, car keys and fobs, safes and commercial access control each get a page. Each covers what's involved and how pricing works.",
      },
      {
        title: "Report spam and grow reviews",
        body: "We document and report fake competitor listings through Google's tools. At the same time we build a steady flow of reviews from real customers.",
      },
    ],
    quickWins: [
      "Show your locksmith license number on your website footer and contact page, if your state requires one.",
      "Add photos of your branded van, shop and team to your Google Business Profile.",
      "Publish a clear service call fee and how you quote before starting work.",
      "Create a separate automotive locksmith page listing the key and fob types you handle.",
      "Report obviously fake locksmith listings in your area through Google's redressal form.",
    ],
    compliance:
      "Several states, including California, Texas, Illinois and New Jersey, require locksmith licensing, and some cities add their own rules. Display license numbers where required. Google also runs advanced verification for locksmith listings and requires license and background checks for Local Services Ads, so your business details must match your paperwork.",
    faqs: [
      {
        q: "Why do fake locksmith listings outrank me?",
        a: "Spammers create listings with addresses close to dense neighborhoods and keyword-stuffed names. Google removes many but new ones appear. Reporting them and building real trust signals is the steady path back up.",
      },
      {
        q: "My listing got suspended. What now?",
        a: "First check that your name, address and service area follow Google's guidelines exactly. Then file a reinstatement request with proof like a business license, utility bill and photos of signage. We can help prepare that evidence.",
      },
      {
        q: "Should I list my home address?",
        a: "If customers don't visit you, set up as a service area business and hide the address. If you have a storefront where customers come in, show it. Mixing these up is a common cause of suspensions.",
      },
      {
        q: "Is it worth having separate pages for car keys?",
        a: "Yes. Automotive key and fob work is a distinct search market with good margins. People often search by vehicle make, so a page listing the makes you handle helps.",
      },
    ],
    related: ["home-services-seo", "plumber-seo", "auto-repair-seo"],
  },
  {
    slug: "fence-company-seo",
    name: "Fence Companies",
    audience: "fence contractors",
    title: "Fence Company SEO | Best SEO Company",
    metaDescription:
      "SEO for fence companies. Rank for wood, vinyl, aluminum and chain link fence searches in your area and turn estimates into signed installs. Free audit.",
    primaryKeyword: "fence company seo",
    secondaryKeywords: [
      "seo for fence companies",
      "fencing contractor seo",
      "fence installation seo",
      "fence company marketing",
    ],
    h1: "Fence Company SEO for More Estimate Requests",
    intro:
      "Homeowners shopping for a fence usually compare materials, prices and photos before they ask for quotes. We help fence contractors rank for those material and project searches and showcase real installs that win the estimate. That includes residential, commercial and farm fencing.",
    color: "lav",
    schemaType: "HomeAndConstructionBusiness",
    challenges: [
      {
        title: "Buyers shop by material",
        body: "People search for \"vinyl privacy fence\" or \"aluminum pool fence,\" not just \"fence company.\" Each material has its own pricing, pros and cons. Sites that lump them together miss most of that traffic.",
      },
      {
        title: "Big-box stores compete on price",
        body: "Home improvement stores sell fence installs and DIY materials. Their pages rank for broad cost searches. Local contractors need to explain the value of their own crews and workmanship.",
      },
      {
        title: "Strong seasonality",
        body: "Fence demand climbs in spring and summer and drops in winter in much of the country. Pages need to be ranking before the busy season starts. Off-season months are the time to build.",
      },
      {
        title: "Project photos rarely get used",
        body: "Crews finish great-looking jobs every week, but the photos sit on someone's phone. Galleries and Maps photos are some of the strongest selling tools a fence company has.",
      },
    ],
    searches: [
      { query: "fence companies near me", intent: "Local" },
      { query: "vinyl privacy fence installation", intent: "Commercial" },
      { query: "cost of wood fence per linear foot", intent: "Cost" },
      { query: "vinyl vs wood fence", intent: "Comparison" },
      { query: "pool fence code requirements", intent: "Research" },
      { query: "commercial chain link fence contractor", intent: "Commercial" },
    ],
    playbook: [
      {
        title: "Build a page for each fence type",
        body: "Wood, vinyl, aluminum, chain link, wrought iron and farm fencing each get a page with styles, typical lifespan, maintenance and price factors. These match how buyers search.",
      },
      {
        title: "Show real local projects",
        body: "We set up a project gallery organized by material and town. Each entry gets a few photos and a short description, which helps both rankings and trust.",
      },
      {
        title: "Answer the permit and HOA questions",
        body: "We write content on property lines, permits, HOA approvals and pool fence codes in your area. These questions come up early and position you as the local expert.",
      },
      {
        title: "Strengthen Maps and reviews",
        body: "We optimize your Google Business Profile with fence services and photos and set up review requests after each install. Reviews that mention the material help most.",
      },
    ],
    quickWins: [
      "Create a separate page for each fence material you install.",
      "Add a cost guide page showing typical price ranges per linear foot by material.",
      "Upload three to five photos from every finished install to your Google Business Profile.",
      "Add a short form asking for project length, material and address to speed up quotes.",
      "Write a page on your local permit and property line process.",
    ],
    faqs: [
      {
        q: "When should a fence company start SEO?",
        a: "Ideally in fall or winter, before the spring rush. Pages and links take a few months to gain traction. Starting early means you're visible when demand picks up.",
      },
      {
        q: "Should we publish prices?",
        a: "Ranges per linear foot by material work well. People search for fence costs constantly, and a clear guide earns traffic and better-qualified leads. Final quotes can still depend on site conditions.",
      },
      {
        q: "Do we need pages for commercial fencing?",
        a: "If you do commercial work, yes. Property managers and general contractors search differently and care about specs, timelines and insurance. A dedicated page speaks to them.",
      },
      {
        q: "How do we rank in nearby towns?",
        a: "Set your service area accurately, build pages for your main towns using real local projects and collect reviews from customers there. Thin pages that just swap a city name won't help.",
      },
    ],
    related: ["pool-company-seo", "roofing-seo", "painting-contractor-seo", "landscaping-seo"],
  },
  {
    slug: "pool-company-seo",
    name: "Pool Builders",
    audience: "pool builders and installers",
    title: "Pool Company SEO | Best SEO Company",
    metaDescription:
      "SEO for pool builders and installers. Rank for inground, fiberglass and custom pool searches, show your builds and attract serious buyers. Free audit.",
    primaryKeyword: "pool company seo",
    secondaryKeywords: [
      "pool builder seo",
      "seo for pool companies",
      "pool installation seo",
      "pool contractor marketing",
      "inground pool builder seo",
    ],
    h1: "Pool Builder SEO for High-Value Projects",
    intro:
      "A new pool is a large purchase, and buyers spend months researching before they sign. They compare pool types, budgets, timelines and builders. We help pool companies show up throughout that research and present their portfolio in a way that attracts serious, qualified buyers.",
    color: "pink",
    schemaType: "HomeAndConstructionBusiness",
    challenges: [
      {
        title: "Long research cycles",
        body: "Buyers often research for months before calling. If you only target \"pool builder near me,\" you miss them during the comparison stage. Content needs to cover the whole decision.",
      },
      {
        title: "Price shoppers waste sales time",
        body: "Without clear budget information, sales teams spend hours on site visits with people who can't afford a pool. Good content helps people self-qualify before they call.",
      },
      {
        title: "Portfolios live on social media",
        body: "Many builders post their best projects on Instagram but not on their site. Google can't rank you for work it can't see. A crawlable portfolio is a ranking asset.",
      },
      {
        title: "Demand depends on season and region",
        body: "In northern states, buyers plan in winter for summer installs. In the Sun Belt, demand runs most of the year. Timing your content and offers to your region matters.",
      },
    ],
    searches: [
      { query: "inground pool builders near me", intent: "Local" },
      { query: "how much does an inground pool cost", intent: "Cost" },
      { query: "fiberglass vs concrete pool", intent: "Comparison" },
      { query: "how long does it take to build a pool", intent: "Research" },
      { query: "pool financing options", intent: "Cost" },
      { query: "custom pool and spa design", intent: "Commercial" },
    ],
    playbook: [
      {
        title: "Cover each pool type in depth",
        body: "Concrete, fiberglass and vinyl liner pools each get a detailed page with cost factors, build timelines, maintenance and lifespan. These pages capture buyers early.",
      },
      {
        title: "Build a searchable portfolio",
        body: "We turn your best builds into project pages with photos, features and location. Organized by style and town, they help you rank and show prospects what you can do.",
      },
      {
        title: "Answer budget and process questions",
        body: "We create guides on total cost, financing, permits, excavation and what happens each week of a build. Buyers who read these arrive informed and ready.",
      },
      {
        title: "Earn local trust and links",
        body: "We pursue mentions through home shows, local builder associations, supplier dealer listings and home and garden press. We also grow reviews from finished projects.",
      },
    ],
    quickWins: [
      "Publish a pool cost guide with realistic budget ranges for your area.",
      "Move your best Instagram projects onto individual portfolio pages on your site.",
      "Create a \"pool build process\" page that walks through each stage week by week.",
      "Claim your dealer listing on your pool manufacturer's site if you're an authorized installer.",
      "Add a short budget question to your contact form to help qualify leads.",
    ],
    faqs: [
      {
        q: "Should we publish pool prices?",
        a: "Ranges work well. Buyers search for pool costs early, and a clear, honest guide earns trust and filters out people who aren't ready. You can explain what pushes a project up or down.",
      },
      {
        q: "How do we rank outside our home town?",
        a: "Build portfolio pages for projects in nearby towns, set your service area accurately and collect reviews from customers there. Real local work is the best proof you serve an area.",
      },
      {
        q: "Do we need a blog?",
        a: "You need content that answers buyer questions, whether it's called a blog or a guide. Topics like pool types, costs, timelines and maintenance bring in people who are planning a purchase.",
      },
      {
        q: "We also do pool service and remodels. Should those be separate?",
        a: "Yes. Service, renovation and new construction attract different buyers with different searches. Separate pages let each one rank and convert on its own.",
      },
    ],
    related: ["fence-company-seo", "home-services-seo", "solar-seo", "landscaping-seo"],
  },
  {
    slug: "pest-control-seo",
    name: "Pest Control",
    audience: "pest control companies",
    title: "Pest Control SEO Services | Best SEO Company",
    metaDescription:
      "Pest control SEO that ranks you for termite, bed bug, rodent and mosquito searches in your area. Pest pages, Maps rankings and recurring plans. Free audit.",
    primaryKeyword: "pest control seo",
    secondaryKeywords: [
      "seo for pest control",
      "pest control marketing",
      "exterminator seo",
      "termite company seo",
      "local seo for pest control",
    ],
    h1: "Pest Control SEO That Wins Local Calls",
    intro:
      "People searching for pest control usually have a problem right now and want it gone fast. Many of them also want a recurring plan once the crisis is handled. We help pest control companies rank for urgent pest searches and turn those first calls into long-term service customers.",
    color: "taupe",
    schemaType: "HomeAndConstructionBusiness",
    challenges: [
      {
        title: "National brands dominate",
        body: "Large pest control companies have huge brand recognition and pages for nearly every city. Local operators compete through speed, reviews and specific pest expertise.",
      },
      {
        title: "Each pest is a separate search",
        body: "Termites, bed bugs, rodents, roaches and mosquitoes each have their own searches, urgency and pricing. A generic services page can't rank for all of them.",
      },
      {
        title: "Pest pressure is seasonal and regional",
        body: "Termite swarms, mosquito season and winter rodents come at different times in different states. Content needs to match the pests and timing in your area.",
      },
      {
        title: "One-time calls rarely become plans",
        body: "Many companies treat a problem and lose touch. Recurring service plans are where the steady revenue is. Your site needs to sell the plan, not only the visit.",
      },
    ],
    searches: [
      { query: "exterminator near me", intent: "Local" },
      { query: "bed bug treatment cost", intent: "Cost" },
      { query: "signs of termites in house", intent: "Research" },
      { query: "same day pest control", intent: "Emergency" },
      { query: "mosquito yard treatment service", intent: "Commercial" },
      { query: "pest control plans compared", intent: "Comparison" },
    ],
    playbook: [
      {
        title: "Create a page for each pest",
        body: "We build pages for every pest you treat, with identification tips, risks, treatment methods and what happens after. These match both urgent and research searches.",
      },
      {
        title: "Optimize for the map pack",
        body: "We set the right categories, list pest services and keep hours and service area accurate. Then we build a review routine tied to finished treatments.",
      },
      {
        title: "Sell the recurring plan",
        body: "We create clear plan pages showing what's covered, how often you visit and what it costs. Every pest page links to the plan that fits.",
      },
      {
        title: "Publish local, seasonal content",
        body: "We plan content around your region's pest calendar, like termite swarm season or fall rodent entry. Publishing ahead of each season helps you rank when calls start.",
      },
    ],
    quickWins: [
      "Build separate pages for your top five pests instead of one services list.",
      "Add your state pesticide applicator license number to your site footer.",
      "Create a comparison table of your service plans with price and visit frequency.",
      "Add pest identification photos to each pest page so people can confirm what they're seeing.",
      "Ask for a review after the follow-up visit, once the problem is clearly solved.",
    ],
    compliance:
      "Pest control businesses and applicators are licensed at the state level, usually through the state department of agriculture or a structural pest control board. Show license numbers where your state requires them. Avoid absolute safety claims about pesticides, since federal and state rules restrict calling products \"safe\" or \"non-toxic.\"",
    faqs: [
      {
        q: "How do we compete with Terminix or Orkin locally?",
        a: "Focus on what a local company does better, like faster response, a named technician and local pest knowledge. Strong reviews and detailed pest pages help you win the map pack in your area. Many people prefer a local operator when they find one.",
      },
      {
        q: "Should we publish treatment prices?",
        a: "Starting prices or ranges help, especially for searches like bed bug or termite treatment costs. Explain what affects the final price. This builds trust and improves lead quality.",
      },
      {
        q: "Can we call our treatments eco-friendly or safe?",
        a: "Be careful. Regulators restrict safety claims about pesticides. Describe your methods specifically, like targeted baiting or reduced-risk products, and avoid words like \"safe\" or \"harmless.\"",
      },
      {
        q: "What content brings in the most calls?",
        a: "Pest-specific pages for urgent problems like bed bugs, termites and rodents tend to drive the most calls. Seasonal guides help capture people early. Plan pages turn those visitors into recurring customers.",
      },
    ],
    related: ["home-services-seo", "carpet-cleaning-seo", "hvac-seo"],
  },
  {
    slug: "real-estate-seo",
    name: "Real Estate",
    audience: "real estate agents and brokerages",
    title: "Real Estate SEO Services | Best SEO Company",
    metaDescription:
      "Real estate SEO for agents, teams and brokerages. Rank for neighborhood and home value searches, build your local brand and earn seller leads. Free audit.",
    primaryKeyword: "real estate seo",
    secondaryKeywords: [
      "seo for realtors",
      "real estate agent seo",
      "realtor seo",
      "seo for real estate agents",
      "brokerage seo",
    ],
    h1: "Real Estate SEO for Agents Who Know Neighborhoods",
    intro:
      "Zillow, Realtor.com and Redfin own most generic home searches, and agents can't outrank them on listings. Agents can win on local knowledge. We help agents, teams and brokerages rank for neighborhood, relocation and seller searches that portals don't answer well.",
    color: "lime",
    schemaType: "RealEstateAgent",
    challenges: [
      {
        title: "Portals own listing searches",
        body: "Searches like \"homes for sale in Tampa\" are dominated by Zillow, Realtor.com and Redfin. Their scale is hard to match. Agents need to target searches where local expertise matters.",
      },
      {
        title: "IDX content is duplicated",
        body: "IDX listing feeds show the same data on thousands of agent sites. Google sees little unique value in them. Your own neighborhood and market content is what sets you apart.",
      },
      {
        title: "Seller leads are the prize",
        body: "Buyer traffic is plentiful, but listings drive agent income. Sellers search differently, with questions about home value, timing and fees. Most agent sites don't speak to them.",
      },
      {
        title: "Personal brand drives referrals",
        body: "Many clients look up an agent by name after a referral. If your name brings up a thin profile or someone else, you lose credibility. Your name search needs to show you at your best.",
      },
    ],
    searches: [
      { query: "realtor near me", intent: "Local" },
      { query: "what is my home worth", intent: "Research" },
      { query: "best neighborhoods in charlotte for families", intent: "Research" },
      { query: "moving to boise from california", intent: "Research" },
      { query: "real estate agent commission rates", intent: "Cost" },
      { query: "top listing agent in scottsdale", intent: "Comparison" },
    ],
    playbook: [
      {
        title: "Build real neighborhood guides",
        body: "We create guides for the areas you serve, covering schools, commutes, housing styles, price ranges and local spots. These pages rank and show your expertise.",
      },
      {
        title: "Target seller searches",
        body: "We build home valuation, selling process and market update pages for your area. These pages bring in owners who are thinking about listing.",
      },
      {
        title: "Strengthen the agent profile",
        body: "We optimize your Google Business Profile, Zillow and Realtor.com agent profiles and your bio page. A strong review count and consistent details help your name search.",
      },
      {
        title: "Publish local market updates",
        body: "We help you share monthly market notes using your MLS data and observations. Regular, specific updates earn links and give AI tools something credible to cite.",
      },
    ],
    quickWins: [
      "Create a guide page for each of your top three neighborhoods.",
      "Add a home valuation request page with a short form for seller leads.",
      "Ask recent clients for Google reviews and Zillow reviews in the same follow-up.",
      "Add your license number and brokerage name to your website footer as required.",
      "Write a \"relocating to [your city]\" page if you get out-of-state buyers.",
    ],
    compliance:
      "Fair Housing Act rules apply to all real estate marketing, including website content. Describe properties and neighborhoods, not who should live there, and avoid wording tied to race, religion, sex, disability, familial status, national origin or color, plus any classes your state adds. Phrases like \"great for young families\" or \"exclusive neighborhood\" can create risk. State license law also requires showing your brokerage name in advertising.",
    faqs: [
      {
        q: "Can I outrank Zillow?",
        a: "For broad listing searches, rarely. For neighborhood guides, relocation questions, seller topics and your own name, yes. Those searches are often where the best clients come from.",
      },
      {
        q: "Is IDX bad for SEO?",
        a: "IDX is useful for visitors, but it doesn't help much with rankings because the same listings appear everywhere. Pair it with your own content. Unique neighborhood pages are what Google rewards.",
      },
      {
        q: "Should a team have one site or one per agent?",
        a: "Usually one strong team site with a page for each agent works best. It concentrates authority in one place. Individual agents can still build their own Google and portal profiles.",
      },
      {
        q: "How do I make my neighborhood pages Fair Housing safe?",
        a: "Describe facts about the area like housing types, parks, commute times and amenities. Link to school district sites instead of characterizing schools yourself. Avoid describing who the area is good for.",
      },
    ],
    related: ["insurance-agency-seo", "financial-services-seo", "home-services-seo"],
  },
  {
    slug: "yoga-studio-seo",
    name: "Yoga Studios",
    audience: "yoga studios",
    title: "Yoga Studio SEO | Best SEO Company",
    metaDescription:
      "SEO for yoga studios. Rank for hot yoga, beginner and prenatal class searches near you, fill intro offers and keep classes full. Free 40-point SEO audit.",
    primaryKeyword: "yoga studio seo",
    secondaryKeywords: [
      "seo for yoga studios",
      "yoga studio marketing",
      "yoga business seo",
      "local seo for yoga studios",
    ],
    h1: "Yoga Studio SEO That Fills Your Mats",
    intro:
      "New students usually find a yoga studio by searching for a style or a beginner class nearby. They want to know what to expect, what to bring and how much the first visit costs. We help studios rank for those searches and make the first class an easy yes.",
    color: "lav",
    schemaType: "SportsActivityLocation",
    challenges: [
      {
        title: "Searches split by style",
        body: "Hot yoga, vinyasa, yin, prenatal and aerial each have their own searches. A homepage that just says \"yoga classes\" misses most of them. Each style you teach needs its own page.",
      },
      {
        title: "Beginners feel intimidated",
        body: "Many people want to try yoga but worry about flexibility or not knowing the poses. If your site doesn't address that, they don't book. Beginner-focused content wins those visitors.",
      },
      {
        title: "Schedules hide in booking apps",
        body: "Studios often link out to a booking platform for everything. That content doesn't count for your site. Google needs class descriptions and schedules on your own pages.",
      },
      {
        title: "Gyms and apps compete for the same student",
        body: "Gyms offer yoga classes, and apps offer it at home. A studio has to show what's different about practicing in your space with your teachers.",
      },
    ],
    searches: [
      { query: "yoga studio near me", intent: "Local" },
      { query: "hot yoga near me", intent: "Local" },
      { query: "beginner yoga classes", intent: "Commercial" },
      { query: "yoga intro offer first week", intent: "Cost" },
      { query: "vinyasa vs hatha yoga", intent: "Comparison" },
      { query: "prenatal yoga classes near me", intent: "Local" },
    ],
    playbook: [
      {
        title: "Build a page for each class style",
        body: "Each style gets a page explaining the pace, heat, who it suits and which teachers lead it. Pages link straight to the schedule and intro offer.",
      },
      {
        title: "Make a strong beginner page",
        body: "We create a first-visit guide covering what to wear, what to bring, arrival time and which classes suit new students. This answers the question that keeps people from booking.",
      },
      {
        title: "Polish the Google profile",
        body: "We set accurate categories, list class types, add photos of the studio and teachers and keep hours current. Then we build a habit of asking students for reviews.",
      },
      {
        title: "Promote workshops and trainings",
        body: "Teacher trainings, workshops and retreats get their own pages. These attract committed students and earn links from local event listings.",
      },
    ],
    quickWins: [
      "Create a \"new student\" page and link it from your main navigation.",
      "Put your intro offer price on the homepage and in your Google Business Profile.",
      "Add a page for each class style you teach with a short description and difficulty level.",
      "Add teacher bios with their training and the styles they teach.",
      "Upload photos of your actual studio space so first-timers know what to expect.",
    ],
    faqs: [
      {
        q: "Do we need a page for every class style?",
        a: "For every style you teach regularly, yes. People search for the style they want, like hot yoga or yin. A dedicated page gives you a real chance to rank for each.",
      },
      {
        q: "Should our teacher training have its own page?",
        a: "Yes. Teacher training searches come from motivated people willing to travel or commit. A detailed page with schedule, curriculum and pricing can attract students from a wider area.",
      },
      {
        q: "How do we compete with gyms that offer yoga?",
        a: "Show what your studio offers that a gym class doesn't, like smaller classes, specialized styles and experienced teachers. Reviews that mention the community and teaching quality help a lot.",
      },
      {
        q: "Does our booking app hurt SEO?",
        a: "The app is fine for booking. The problem is when all your class information lives only there. Keep descriptions and schedules on your own site too.",
      },
    ],
    related: ["gym-seo", "med-spa-seo", "chiropractor-seo"],
  },
  {
    slug: "hair-salon-seo",
    name: "Hair Salons",
    audience: "hair salons",
    title: "Hair Salon SEO Services | Best SEO Company",
    metaDescription:
      "Hair salon SEO to rank in Google Maps for balayage, color, cuts and extensions near you. Service pages, stylist profiles and booked chairs. Free audit.",
    primaryKeyword: "hair salon seo",
    secondaryKeywords: [
      "seo for hair salons",
      "salon seo",
      "salon marketing",
      "beauty salon seo",
      "local seo for salons",
    ],
    h1: "Hair Salon SEO That Keeps Chairs Booked",
    intro:
      "People choose a salon by looking at photos, reviews and whether someone nearby does the exact service they want. We help hair salons rank for those specific searches and show the work that convinces a new client to book. That includes salon owners and suite-based stylists.",
    color: "pink",
    schemaType: "HairSalon",
    challenges: [
      {
        title: "Clients search for specific services",
        body: "People search for balayage, curly cuts, extensions or keratin treatments. A generic services menu doesn't rank for those. Each specialty needs its own page.",
      },
      {
        title: "Instagram holds the best work",
        body: "Stylists post their best results on Instagram, but none of that helps your Google rankings. Your site and Maps profile need the same visual proof.",
      },
      {
        title: "Stylists build their own followings",
        body: "Clients often follow a stylist, not a salon. When a stylist leaves, reviews and clients can leave too. Your SEO should build both the salon brand and stylist profiles.",
      },
      {
        title: "Pricing varies by stylist and hair",
        body: "Color and extension prices depend on length, thickness and stylist level. Without some guidance, people hesitate to book. Clear ranges help.",
      },
    ],
    searches: [
      { query: "hair salon near me", intent: "Local" },
      { query: "balayage specialist near me", intent: "Local" },
      { query: "how much does balayage cost", intent: "Cost" },
      { query: "curly hair salon", intent: "Commercial" },
      { query: "tape in vs sew in extensions", intent: "Comparison" },
      { query: "walk in haircut open now", intent: "Emergency" },
    ],
    playbook: [
      {
        title: "Give each specialty its own page",
        body: "Color, balayage, extensions, curly cuts and treatments each get a page with photos, process, time required and price range. These match what clients search for.",
      },
      {
        title: "Feature your stylists",
        body: "We build stylist pages with specialties, photos of their work and booking links. This keeps clients connected to the salon even as they follow individual stylists.",
      },
      {
        title: "Optimize the Maps profile",
        body: "We list each service, add photos weekly and keep hours current. We also make the booking link the clear next step from your profile.",
      },
      {
        title: "Ask for reviews that mention services",
        body: "We set up review requests after appointments and encourage clients to mention the service and stylist. Those details help you rank for specific searches.",
      },
    ],
    quickWins: [
      "Create a balayage or color page with a gallery of real client results.",
      "Add starting prices by service and stylist level to your menu page.",
      "Connect your booking platform to your Google Business Profile's booking button.",
      "Post three new photos of your work to your Google profile every week.",
      "Add a stylist page for each team member with their specialties.",
    ],
    faqs: [
      {
        q: "Does Instagram help my salon rank on Google?",
        a: "Not directly. Google ranks your website and Maps profile, so your best photos need to live there too. Instagram is still great for keeping clients engaged.",
      },
      {
        q: "Should we list prices?",
        a: "Starting prices help. Clients are nervous about color and extension costs, and a range sets expectations. Note that the final price depends on hair length and condition.",
      },
      {
        q: "What happens to our reviews when a stylist leaves?",
        a: "Reviews on your Google profile stay with the salon. That's one reason to direct reviews to the salon's profile and not only a stylist's personal page.",
      },
      {
        q: "We're a salon suite. Can individual stylists rank?",
        a: "Yes. Each independent stylist can have their own Google Business Profile if they meet Google's guidelines. A simple site with service pages and photos helps them stand out within the suite building.",
      },
    ],
    related: ["med-spa-seo", "yoga-studio-seo", "wedding-photographer-seo"],
  },
  {
    slug: "private-jet-charter-seo",
    name: "Private Jet Charter",
    audience: "private jet charter operators and brokers",
    title: "Private Jet Charter SEO | Best SEO Company",
    metaDescription:
      "SEO for private jet charter operators and brokers. Rank for route, aircraft and empty leg searches and earn trust with high-value travelers. Free audit.",
    primaryKeyword: "private jet charter seo",
    secondaryKeywords: [
      "seo for private jet companies",
      "aviation seo",
      "jet charter marketing",
      "private aviation seo",
      "charter broker seo",
    ],
    h1: "Private Jet Charter SEO for High-Value Flyers",
    intro:
      "Private jet clients search by route, aircraft size and occasion, and they expect clear, credible answers. We help charter operators and brokers rank for those searches and present their safety standards and service in a way that earns a quote request. Every page is built to be transparent about who operates the flight.",
    color: "taupe",
    schemaType: "Organization",
    challenges: [
      {
        title: "Searches are route and aircraft driven",
        body: "People search for \"private jet New York to Miami\" or \"midsize jet charter.\" Each route and aircraft class is its own small market. Covering them well takes a lot of specific content.",
      },
      {
        title: "Marketplaces and apps compete",
        body: "Large charter marketplaces and membership programs invest heavily in search. Smaller operators and brokers need to win on specific routes, regions and service.",
      },
      {
        title: "Trust is hard to earn online",
        body: "Clients are spending large sums and worry about safety and reliability. They look for safety ratings, operator details and clear processes. Vague marketing pages lose them.",
      },
      {
        title: "Operator and broker roles get blurred",
        body: "Many sites make it unclear who actually operates the aircraft. That creates regulatory risk and erodes trust. Clear disclosure has to be part of the content.",
      },
    ],
    searches: [
      { query: "private jet charter near me", intent: "Local" },
      { query: "private jet new york to miami cost", intent: "Cost" },
      { query: "empty leg flights this week", intent: "Commercial" },
      { query: "light jet vs midsize jet", intent: "Comparison" },
      { query: "jet card vs on demand charter", intent: "Comparison" },
      { query: "pet friendly private jet charter", intent: "Research" },
    ],
    playbook: [
      {
        title: "Build route and airport pages",
        body: "We create pages for your most-flown routes and the private terminals and FBOs you use. Each covers flight time, suitable aircraft and pricing factors.",
      },
      {
        title: "Explain aircraft categories",
        body: "We build pages for turboprops, light, midsize, super-midsize and heavy jets. Each explains seats, range, baggage and typical missions so clients can choose.",
      },
      {
        title: "Show safety and operator details",
        body: "We present safety audits like ARGUS or Wyvern where you hold them, operator certificates and your vetting process. This content answers the trust question directly.",
      },
      {
        title: "Capture empty legs and events",
        body: "We set up crawlable empty leg pages and seasonal event pages for things like major sporting events and holiday travel. These attract timely, high-intent searches.",
      },
    ],
    quickWins: [
      "Add a clear statement on every page about whether you are the operator or a broker.",
      "Create pages for your five most popular city-pair routes.",
      "Publish an aircraft category guide with seats, range and baggage for each class.",
      "List the safety audits and certificates you actually hold on a dedicated safety page.",
      "Make your empty leg listings indexable instead of hiding them behind a login.",
    ],
    compliance:
      "In the US, on-demand charter flights must be operated by a carrier holding an FAA Part 135 certificate, or Part 121 where applicable. Brokers who don't operate aircraft must not imply they do, and DOT rules require them to disclose that they act as an agent and name the operator in advertising and solicitations. Keep safety claims tied to audits you actually hold.",
    faqs: [
      {
        q: "We're a broker. Can we still rank well?",
        a: "Yes. Brokers often rank well with route, aircraft and service content. You need to be clear that you arrange flights with certified operators and disclose who operates each flight.",
      },
      {
        q: "Should we publish charter prices?",
        a: "Ranges by aircraft class and sample routes work well. Clients search for these numbers and value honesty about what drives cost. Note that final quotes depend on dates, positioning and fees.",
      },
      {
        q: "Are empty leg pages worth building?",
        a: "Yes, if they're kept current and indexable. Empty leg searches come from flexible, price-aware travelers. Stale listings hurt trust, so they need an update routine.",
      },
      {
        q: "How do we show up in AI search for private jets?",
        a: "Clear, factual pages about your aircraft, routes and safety standards help. Consistent descriptions across your site and aviation directories make it easier for AI tools to cite you. We audit how AI answers describe you and fill the gaps.",
      },
    ],
    related: ["yacht-charter-seo", "limousine-seo", "hotel-seo"],
  },
];
