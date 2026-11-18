# bestseocompany.us: SEO implementation report

_Prepared November 18, 2026. Covers everything built into the site and what's left to do after launch._

## 1. Summary

| Area | Status |
|---|---|
| Indexable pages | **98 URLs** in `/sitemap.xml` |
| Crawl check (status, H1, title, meta description, canonical, hreflang, Open Graph, JSON-LD) | **0 issues** across all 98 URLs |
| Duplicate titles / descriptions / primary keywords | **0** |
| Structured data | Valid JSON-LD on every content page |
| AI search (AEO/GEO) | `llms.txt`, `llms-full.txt`, AI crawlers allowed, answer-first content, speakable markup |
| Forms | All post to `/api/lead`; set `LEAD_WEBHOOK_URL` to receive them |

## 2. Site architecture

```
/                         Home
├─ /services              14 service pages      /services/[slug]
├─ /industries            45 industry pages     /industries/[slug]   (searchable, 7 categories)
├─ /tools/free-seo-tools  5 free tools          /tools/[slug]        (/tools redirects here)
├─ /guides                13 question-led guides /guides/[slug]
├─ /blog                  8 posts               /blog/[slug]  + RSS /blog/rss.xml
├─ /pricing  /free-seo-audit  /about  /contact
├─ /privacy  /terms  /editorial-policy  /site-map (HTML sitemap)
└─ /sitemap.xml  /robots.txt  /llms.txt  /llms-full.txt  /manifest.webmanifest
```

Every page is at most two clicks from the homepage, through the mega-menu header, footer link columns and hub pages. Each content page links to three related pages of its type plus relevant services. Breadcrumbs (visible and in schema) are on every inner page.

Keyword cannibalization was avoided by merging near-duplicate topics into single pages: Dental + Dentist, MVA + Car Accident Lawyers, Burial Insurance + Final Expense, Attorney + Lawyers. Guides and blog posts cover different questions.

The full page-to-keyword list is in **[`keyword-map.csv`](keyword-map.csv)** (regenerate with `npm run seo:export`).

## 3. Technical SEO

| Item | Implementation |
|---|---|
| Rendering | Every page is statically generated at build time; content is in the HTML (no client-side rendering needed to read it) |
| Titles & descriptions | Unique per page, titles ≤ 60–65 chars, descriptions 140–160 chars, set via `lib/seo.ts` |
| Canonicals | Self-referencing absolute canonical on every page |
| hreflang | `en-US` and `x-default` on every page |
| Open Graph / Twitter | Per-page title and description; auto-generated 1200×630 share image for every industry, service, tool, guide and blog page |
| robots.txt | Allows all crawlers, blocks `/api/`, links the sitemap |
| XML sitemap | 98 URLs with priority, change frequency and last-modified dates |
| HTML sitemap | `/site-map` for users and crawlers |
| Robots meta | `max-snippet:-1`, `max-image-preview:large` so Google can show rich snippets |
| Icons & manifest | SVG favicon, 180px Apple touch icon, 512px PNG logo, web app manifest |
| 404 page | Custom page with links back into the site |
| Redirects | `/tools` → `/tools/free-seo-tools` (308) |
| Security headers | `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` |
| Fonts | Self-hosted through `next/font` (no third-party font requests) |
| Mobile | Responsive at all widths, tested at 390px with no horizontal scroll; mobile menu |
| Accessibility | One H1 per page, labelled forms, keyboard-operable menus, reduced-motion support |
| Verification | Google Search Console meta tag in place |

## 4. Structured data (schema.org JSON-LD)

| Page type | Schema |
|---|---|
| Home | ProfessionalService (Organization: logo, contactPoint, areaServed, knowsAbout, priceRange), WebSite, FAQPage |
| Industry & service pages | Service (provider = our organization, areaServed US, audience), FAQPage, BreadcrumbList |
| Tool pages | WebApplication (free offer) or CollectionPage, FAQPage, BreadcrumbList |
| Guides | Article (with speakable), FAQPage, BreadcrumbList |
| Blog | Blog hub; BlogPosting (with speakable), FAQPage, BreadcrumbList |
| Pricing | OfferCatalog with monthly price specifications, FAQPage |
| About / Contact | AboutPage, ContactPage |
| Hubs | CollectionPage, BreadcrumbList |

Note: Google currently shows FAQ rich results only for a small set of government and health sites, so FAQPage markup here helps machine understanding and AI answers rather than producing visible rich results.

## 5. AEO & GEO (AI search visibility)

- **`/llms.txt`**: a concise map of the site with key facts (name, services, pricing, contact) and a one-line summary of every page, in the llms.txt format.
- **`/llms-full.txt`**: the full text of every guide, blog post, service and industry page (about 58,000 words) in Markdown for AI systems.
- **AI crawlers explicitly allowed**: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended and others.
- **Answer-first content**: every guide and blog post opens with a 40–60 word "Short answer" written to be quoted, followed by key takeaways, question-style headings, tables and FAQs.
- **Speakable markup** on guide and blog answers for voice assistants.
- **Entity consistency**: the same name, domain, description and contact details appear in Organization schema, the About page "Key facts" block, `llms.txt` and the footer.
- **Editorial policy page** documenting sourcing, AI-assistance and corrections (supports E-E-A-T).

## 6. Content inventory

| Type | Pages | Approx. words each |
|---|---|---|
| Industry pages | 45 | ~1,100 (rendered) |
| Service pages | 14 | ~1,000 |
| Tool pages | 5 | ~900 |
| Guides | 13 | 1,200–1,700 |
| Blog posts | 8 | 950–1,150 |
| Company & policy pages | 8 | varies |

All copy avoids invented statistics, client results and ranking guarantees.

## 7. Things to fix before or right after launch

**Must do**
1. **Replace sample claims on the homepage.** The stats (350+ businesses, 12 years, 94% retention, 4,800+ keywords, 38 states, +212%), case studies, testimonials and dashboard numbers are placeholders. Publishing unverified claims or reviews can violate FTC rules and Google's policies. Edit them in `lib/content.ts`.
2. **Fill in the legal placeholders** in `lib/pages/policies.ts`: `[Legal entity name]` (4×), `[Business address]` (3×), `[State]` (2×). Have a lawyer review Privacy and Terms. Confirm the added clauses: a $100 liability cap (Terms), a yearly guide review cycle and correction notes (Editorial policy), and an unsubscribe link in every newsletter (Privacy).
3. **Set `LEAD_WEBHOOK_URL`** in Vercel so audit, contact, report and newsletter submissions reach you, and decide who fulfils backlink, traffic and rank report requests.
4. **Connect the domain** `bestseocompany.us` in Vercel and verify it in Google Search Console, then submit `https://bestseocompany.us/sitemap.xml`.

**Should do**
5. **Bing Webmaster Tools:** import the site from Search Console (this also feeds ChatGPT search and Copilot).
6. **Add official profiles** (Google Business Profile, LinkedIn, Clutch, etc.) to `site.sameAs` in `lib/content.ts`. They are added to Organization schema automatically and strengthen entity recognition in AI search.
7. **Analytics:** add GA4 (or a privacy-friendly alternative) and update the Privacy Policy's cookie section at the same time.
8. **Real author bios:** if team members are willing to be named, add author pages and bylines to guides (strong E-E-A-T signal).
9. **Keyword volumes:** the target phrasing for each page was chosen using standard conventions because the OpenSEO account had no credits. Once credits are available, run the keyword map through a volume and difficulty check and adjust titles where a variant has clearly more demand.

## 8. First 90 days after launch

| Weeks | Focus |
|---|---|
| 1–2 | Domain live, Search Console and Bing verified, sitemaps submitted, request indexing for home, pricing, services and top industry pages. Create the Google Business Profile. |
| 3–6 | Check Search Console's Page indexing report; fix anything "Discovered/Crawled – not indexed". Start link building: agency directories (Clutch, DesignRush, UpCity), partner and supplier mentions, digital PR. |
| 7–10 | Add real case studies with client permission. Publish two blog posts a month on topics from Search Console queries. |
| 11–13 | Review rankings and impressions per page in `keyword-map.csv`; refresh titles and intros on pages with impressions but low click-through. Track brand mentions in ChatGPT, Perplexity and Google AI Overviews. |

## 9. How this was checked

- Production build (`npm run build`): all pages statically generated.
- Automated crawl of all 98 sitemap URLs: HTTP 200, exactly one H1, title and description lengths, self-canonical, hreflang, og:title, og:image, valid JSON-LD, no duplicate titles or descriptions.
- Browser checks at 1440px and 390px: no console errors, no horizontal scroll, header mega menu and mobile menu working.
- Audit tool: SSRF protections tested (localhost, private ranges, cloud metadata IPs, non-standard ports all blocked); on-page checks verified against our own pages. A live audit of an external site could not be tested from the build sandbox and should be tried once on the deployed site.
