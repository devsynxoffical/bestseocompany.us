import type { PolicyPage } from "./types";

/**
 * Policy pages: /privacy, /terms, /editorial-policy.
 * Items in [square brackets] are placeholders the site owner must fill in.
 */
export const policies: PolicyPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    metaDescription:
      "How Best SEO Company collects, uses and protects data from our website, forms and free SEO audit tool, and your privacy choices and US state rights.",
    updated: "2026-11-18",
    intro:
      "This Privacy Policy explains what information Best SEO Company collects when you use bestseocompany.us, how we use it, and the choices you have. We have tried to keep it short, plain and accurate to what the site actually does.",
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          "Best SEO Company is a US-based search engine optimization agency that serves US businesses. The website at https://bestseocompany.us is operated by [Legal entity name], [Business address] (\"Best SEO Company\", \"we\", \"us\" or \"our\").",
          "This policy covers the website and its free tools. If you become a client, information shared during the engagement is also covered by your signed agreement with us.",
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: [
          "We only collect information you choose to send us and the basic technical information that any website receives when you visit it.",
        ],
        bullets: [
          "Free audit requests: the website address you want reviewed and your email address.",
          "Report requests (backlink, traffic and rank reports): your website address and email address, plus any keywords and location you choose to add.",
          "Newsletter signup: your email address.",
          "Free SEO audit tool: the URL you enter. Our server fetches that public page, along with the site's robots.txt and sitemap.xml files, to run its checks. The results are shown on your screen and are not stored by the tool itself.",
          "Server logs: like most websites, our hosting provider (Vercel) records technical details of requests to the site, including your IP address, browser user agent, the page requested and the time of the request. Form submissions may also appear in these logs.",
        ],
      },
      {
        heading: "How we use your information",
        paragraphs: ["We use the information described above to:"],
        bullets: [
          "Prepare and send the audit or report you asked for, and follow up with you about it.",
          "Send our newsletter if you signed up for it. Every newsletter includes a way to unsubscribe.",
          "Reply to questions and requests you send us.",
          "Run the free audit tool when you enter a URL.",
          "Keep the website working and secure, including spotting and preventing abuse, spam and errors.",
          "Comply with legal obligations.",
        ],
      },
      {
        heading: "Why we process your information",
        paragraphs: [
          "We are a US business and most of our visitors are in the US. Where privacy laws require a legal reason (a \"legal basis\") for using personal information, such as for visitors from the European Union or United Kingdom, we rely on the following:",
        ],
        bullets: [
          "Your request: we use your details to provide the audit, report or reply you asked for.",
          "Consent: we send newsletters only to people who sign up, and you can withdraw that consent at any time.",
          "Legitimate interests: we use server logs to run, secure and troubleshoot the website.",
          "Legal obligations: we may keep or disclose information where the law requires it.",
        ],
      },
      {
        heading: "How we share information",
        paragraphs: [
          "We do not sell your personal information. We share it only in the limited cases below.",
          "Service providers: form submissions are sent from our server to our own business systems through a webhook, for example an automation tool or customer relationship management (CRM) system, and we use email services to send reports and newsletters. Our website is hosted by Vercel. These providers handle information on our behalf so we can run the site and respond to you.",
          "Legal requirements: we may disclose information if we believe in good faith that the law, a court order or a valid legal process requires it, or to protect the rights, safety or property of our business, our users or others.",
          "Business changes: if our business is merged, acquired or sold, information may transfer to the new owner, who would remain bound by the commitments in this policy for that information.",
        ],
      },
      {
        heading: "How long we keep information",
        paragraphs: [
          "We keep form submissions and related emails for as long as we need them to respond to you, provide the service you asked for, keep reasonable business records and meet legal obligations. After that we delete them or keep them only in a form that no longer identifies you.",
          "Newsletter subscribers stay on our list until they unsubscribe or ask us to remove them. Server logs are kept by our hosting provider for a limited period under its standard log retention settings. The free audit tool does not keep its results.",
        ],
      },
      {
        heading: "Cookies and similar technologies",
        paragraphs: [
          "The website currently uses no analytics cookies and no advertising cookies, and it stores nothing in your browser beyond what is needed for the site to function.",
          "Our fonts are self-hosted, so your browser does not contact Google Fonts or other font services when you load our pages.",
          "If we add analytics (for example, Google Analytics) or other tracking tools in the future, we will update this policy before or when they go live and describe what they collect and how you can opt out.",
        ],
      },
      {
        heading: "Your choices and rights",
        paragraphs: [
          "You are in control of what you send us. The forms only ask for what we need to respond, and optional fields can be left blank.",
          "You can unsubscribe from our newsletter at any time using the link in any newsletter email, or by emailing us.",
          "You can ask us to tell you what personal information we hold about you, to correct it, or to delete it by emailing hello@bestseocompany.us. We may need to confirm your identity before acting on a request, and we may keep some information where the law requires us to. We will not treat you differently for making a request.",
        ],
      },
      {
        heading: "US state privacy rights",
        paragraphs: [
          "Several US states, including California, give residents specific privacy rights. Depending on where you live and whether a law applies to us, these may include the right to:",
        ],
        bullets: [
          "Know what personal information we collect, use and disclose about you, and get a copy of it.",
          "Ask us to delete personal information we collected from you.",
          "Ask us to correct inaccurate personal information.",
          "Opt out of the sale of personal information or its sharing for cross-context behavioral advertising. We do not sell personal information and we do not share it for cross-context behavioral advertising.",
          "Not be discriminated against for using these rights.",
        ],
      },
      {
        heading: "Children's privacy",
        paragraphs: [
          "This website is meant for businesses and is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child has sent us personal information, please email hello@bestseocompany.us and we will delete it.",
        ],
      },
      {
        heading: "Security and international visitors",
        paragraphs: [
          "We use reasonable measures to protect the information we receive, including encrypted (HTTPS) connections to the website and access controls on the systems we use. No website or online service can be completely secure, so we cannot guarantee absolute security.",
          "Our business and website are based in the United States, and our service providers may process information in the US and other countries. If you use the site from outside the US, your information will be transferred to and handled in the US, where privacy laws may differ from those in your country.",
        ],
      },
      {
        heading: "Changes and contact",
        paragraphs: [
          "We may update this policy when our practices change, for example if we add analytics or new tools. When we do, we will change the \"last updated\" date at the top of this page, and for significant changes we may give additional notice.",
          "For privacy questions or requests, email hello@bestseocompany.us or write to [Legal entity name], [Business address].",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    metaDescription:
      "The terms for using the Best SEO Company website and free SEO tools, covering acceptable use, no ranking guarantees, intellectual property and liability.",
    updated: "2026-11-18",
    intro:
      "These Terms of Use set the rules for using bestseocompany.us, including our guides, blog and free SEO tools. They apply to the website only; client SEO services are governed by a separate signed agreement.",
    sections: [
      {
        heading: "Acceptance of these terms",
        paragraphs: [
          "The website at https://bestseocompany.us is operated by [Legal entity name] (\"Best SEO Company\", \"we\", \"us\" or \"our\"). By using the site, you agree to these Terms of Use and to our Privacy Policy. If you do not agree, please do not use the site.",
          "These terms are not a contract for SEO services. If you hire us, your engagement is governed by a separate written agreement that you sign with us. If that agreement conflicts with these terms, the signed agreement controls for the services it covers.",
        ],
      },
      {
        heading: "Using the site and our free tools",
        paragraphs: [
          "You may use the website and its free tools for lawful purposes, such as learning about SEO or checking a website you own or manage. To keep the tools available for everyone, you agree that you will not:",
        ],
        bullets: [
          "Run the audit tool or request reports on websites you are not allowed to analyze. Only submit sites you own, manage or have permission to review.",
          "Use the audit tool to overload, attack or probe websites, or to try to reach pages that are not publicly available.",
          "Use bots, scripts or other automated means to scrape the site or submit requests to our tools in bulk.",
          "Interfere with the site's security or operation, or try to get around any limits we place on the tools.",
          "Submit false information, spam, or content that is unlawful or infringes someone else's rights.",
        ],
      },
      {
        heading: "General information, not professional advice",
        paragraphs: [
          "Our guides, blog posts, tool results and other content are general information about search engine optimization. They are not legal, financial, tax or other professional advice, and they are not tailored to your specific situation.",
          "Search engines change often, so some content may become out of date. Please use your own judgment, and talk to a qualified professional before making legal, financial or other important decisions.",
        ],
      },
      {
        heading: "No guarantees of rankings or results",
        paragraphs: [
          "Search rankings, traffic and leads depend on many factors we do not control, including search engine algorithms and competitors. We do not guarantee any particular ranking, traffic level or business result from using our content, tools or services.",
          "Free tool results are automated checks of publicly available information. They can miss issues or report issues that do not matter for your site, so treat them as a starting point rather than a full audit.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          "The website and its content, including text, graphics, logos, design and code, are owned by Best SEO Company or its licensors and are protected by copyright, trademark and other laws.",
          "You may view and share links to our pages, and quote short excerpts with a link back to the original page. You may not copy, republish, sell or create derivative works from our content without our written permission.",
        ],
      },
      {
        heading: "Third-party links",
        paragraphs: [
          "Our content may link to websites run by other people or companies, such as Google documentation. We do not control those sites and are not responsible for their content, policies or practices. Visiting them is at your own risk and subject to their terms.",
        ],
      },
      {
        heading: "Disclaimer of warranties",
        paragraphs: [
          "The website, its content and its free tools are provided \"as is\" and \"as available\". To the fullest extent the law allows, we disclaim all warranties, whether express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy and non-infringement. We do not promise that the site or tools will always be available, error-free or secure.",
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent the law allows, Best SEO Company and its owners, employees and contractors will not be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profits, revenue, data or rankings, arising from your use of the website or its free tools.",
          "Because the website and tools are provided free of charge, our total liability for any claim relating to them is limited to one hundred US dollars (US$100). Some states do not allow certain limitations of liability, so some of these limits may not apply to you.",
        ],
      },
      {
        heading: "Indemnity",
        paragraphs: [
          "If you misuse the website or its tools, or break these terms or the law, you agree to cover the reasonable losses, costs and legal fees that Best SEO Company incurs as a result of any claim brought by a third party.",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of the State of [State] and applicable US federal law, without regard to conflict-of-law rules. Any dispute about these terms or the website will be brought in the state or federal courts located in [State], and you agree to their jurisdiction.",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "We may update these terms from time to time. When we do, we will change the \"last updated\" date at the top of this page. If you keep using the site after changes take effect, you accept the updated terms.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about these terms can be sent to hello@bestseocompany.us or by mail to [Legal entity name], [Business address].",
        ],
      },
    ],
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    metaDescription:
      "How the Best SEO Company team writes, researches, reviews and corrects SEO guides and blog posts, including how we use AI tools and keep content current.",
    updated: "2026-11-18",
    intro:
      "Our guides and blog posts are meant to be accurate, practical and honest about what SEO can and cannot do. This page explains who writes them, how we check them, and how to tell us when we get something wrong.",
    sections: [
      {
        heading: "Who writes our content",
        paragraphs: [
          "Guides and blog posts on bestseocompany.us are written by the Best SEO Company team: people who do SEO work for US businesses day to day, including technical audits, content, local SEO and link building.",
          "We write from what we see in real projects and from published documentation, and we try to be clear about which is which.",
        ],
      },
      {
        heading: "How we research",
        paragraphs: [
          "We start with primary sources wherever possible and link to them so you can check our work. Sources we commonly rely on include:",
        ],
        bullets: [
          "Google Search Central documentation and official Google announcements.",
          "Documentation from other search engines, platforms and tool vendors when a topic depends on them.",
          "Official standards and specifications, such as schema.org and robots.txt rules.",
          "Our own hands-on testing and client experience, described as such.",
        ],
      },
      {
        heading: "Facts, numbers and claims",
        paragraphs: [
          "We do not invent statistics, quotes, studies or case results. When we cite a number, we name or link the source. When something is our opinion or experience rather than a documented fact, we say so.",
          "SEO involves a lot of uncertainty. Where the evidence is unclear or search engines have not confirmed how something works, we say that rather than presenting a guess as fact.",
        ],
      },
      {
        heading: "How we use AI tools",
        paragraphs: [
          "AI tools may help us with parts of the writing process, such as outlining, drafting or tightening wording. A member of our team reviews and edits every piece before it is published, checks facts and claims against sources, and is responsible for what goes live.",
          "We do not publish AI-generated content without human review.",
        ],
      },
      {
        heading: "Corrections",
        paragraphs: [
          "If you spot an error, an outdated recommendation or a broken source, please email hello@bestseocompany.us with the page address and what needs fixing. We review every correction request.",
          "When we confirm a mistake, we fix it promptly. For corrections that change the meaning or advice of a page, we note the correction on the page.",
        ],
      },
      {
        heading: "Updates and review",
        paragraphs: [
          "Search changes quickly, so we review our content on an ongoing basis. We prioritize pages affected by search engine updates or documentation changes, and we aim to review our main guides at least once a year.",
          "Blog posts show their publication date so you can judge how current the information is.",
        ],
      },
      {
        heading: "Independence and disclosure",
        paragraphs: [
          "We do not accept payment, free products or other compensation in exchange for mentioning, recommending or linking to a product, tool or company.",
          "Best SEO Company sells SEO services, and our content sometimes mentions them. When we do, we make it clear that the service is ours, so you can weigh our advice with that in mind.",
        ],
      },
      {
        heading: "Legal, medical and financial topics",
        paragraphs: [
          "Some of our content touches on topics where mistakes can affect people's money, health or legal position, such as SEO for law firms, medical practices or financial services. We take extra care with these pages and keep to the marketing side of the topic.",
          "This content is general information about SEO and marketing. It is not legal, medical or financial advice, and it does not replace advice from a qualified professional or your own regulatory and compliance review.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          "Questions about this policy or our content can be sent to hello@bestseocompany.us.",
        ],
      },
    ],
  },
];
