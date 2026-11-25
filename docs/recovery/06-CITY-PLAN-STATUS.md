# 06 · City and state pages + SEO plan (25 Nov 2026): status

**Sources:**
- `bestseocompany_Page_Map_25-Nov-2026.csv` (repo root, the source of truth)
- City and State Page Plan (25 Nov)
- SEO, AEO and GEO Plan (25 Nov)
- `CLAUDE_CODE_bestseocompany.md`

**Owner decisions (25 Nov):**
- **AEO/GEO service pages:** retitle them as guides that link to rankempire.us; do not noindex. Due 1 Dec (7-day rule).
- **This run:** start the week 2 city pages, because every week 1 item is blocked until 30 Nov or 1 Dec.
- **"How long does SEO take":** stays at /blog/how-long-does-seo-take. The CSV's /guides URL is treated as done; no duplicate page, no redirect.

## CSV rows: status
| Week | URL | Status | Note |
|---|---|---|---|
| 1 | disavow | Owner | Needs the Semrush export; upload in GSC |
| 1 | /services/answer-engine-optimization, /services/generative-engine-optimization | Blocked until 1 Dec | `lib/pages/services.ts` changed 24 Nov. Then retitle as guides linking to rankempire.us |
| 1 | /industries/roofing-seo | Blocked until 30 Nov | `lib/pages/industries-a.ts` changed 23 Nov. Then turn it into a short guide linking to roofingsystems.co/roofing-seo |
| 1 | / (retitle "Best SEO Company for Small Businesses", answer block, compare table, pricing, results) | Blocked until 1 Dec | `app/page.tsx` changed 24 Nov. The homepage also gets its link to /locations then |
| 2 | /pricing, /services/small-business-seo | Blocked until 1 Dec | changed 24 Nov |
| 2 | /locations | **Built 25 Nov** | 764 words. Targets "seo services near me" |
| 2 | /locations/texas | **Built 25 Nov** | 1,240 words, 71.6% unique |
| 2 | /locations/california | **Built 25 Nov** | 1,195 words, 70.7% unique |
| 3 | /locations/florida, /locations/birmingham-al, /locations/new-orleans-la | Next run | Check the live SERP for UK results before building Birmingham |
| 4 | /services/local-seo, /industries/plumber-seo | Blocked until 1 Dec | |
| 4 | /locations/fort-myers-fl, the-woodlands-tx, boise-id | Later run | |
| 5 | /industries/contractor-seo | Exists (upgrade after 1 Dec) | |
| 5 | /industries/car-accident-lawyer-seo, retitled "Personal Injury SEO" | Blocked until 30 Nov | Must not overlap /industries/personal-injury-seo, which already targets "seo for personal injury lawyers". Decide which page owns "personal injury seo" before retitling |
| 9 | /guides/how-long-does-seo-take | Done as /blog/how-long-does-seo-take | Owner decision |
| 5 to 8 | tier 1 cities | Planned | 3 pages per run, in CSV week order |

## City page rules (enforced in code and checks)
- Data lives in `data/locations.ts`.
- **Facts:** every number links to a public source, such as the SBA Office of Advocacy 2025 profiles or Census QuickFacts.
- **Location claims:** no offices, addresses, clients or reviews are claimed. The schema is Service with areaServed; there is no LocalBusiness.
- **Excluded cities:** RankEmpire's 29 cities are listed in `RANKEMPIRE_CITIES` and are never built.
- **Checks:** `npm run seo:uniq` (with the server running) requires at least 800 words and at least 60% unique 5-word phrases against sibling pages.
- **Sitemaps:** `/sitemap-locations.xml` lists the location pages and is referenced in robots.txt. They are also in the main sitemap.
- **Links:** the footer Company column links to /locations, Texas and California (state hubs only). Each state page links to the hub, its neighbor state and 3 matched industry pages.

## Still to do for the plan
- **Industry pages:** add a "Cities we serve" block to the 51 industry pages (5 a week, after 1 Dec), once city pages exist to link to.
- **Kill rule:** a city page with fewer than 10 impressions after 8 weeks indexed is merged into its state hub with a 301.
- **Tracking:** check these monthly in ChatGPT, Gemini, Perplexity and AI Mode:
  - best seo company for small business
  - affordable seo company
  - seo company near me
  - best seo company in texas
