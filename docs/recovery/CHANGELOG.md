# SEO recovery change log

Every change lists the reason (with evidence), the affected URLs, how it was validated before release, how to validate it after release, and the before/after result. Baseline: [`01-BASELINE.md`](01-BASELINE.md).

## Batch 1 — 2026-11-19 (technical blockers and measurement)

### 1.1 Align canonical host to `https://www.bestseocompany.us`
- **Reason:** URL Inspection showed Google-selected canonical `https://www.bestseocompany.us/` but declared canonical `https://bestseocompany.us/`. The Search Console property is www, and every canonical, sitemap `<loc>`, `og:url`, schema URL, robots `Host`/`Sitemap` line and llms.txt link pointed to the non-www host.
- **Affected URLs:** all 98 URLs; `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/blog/rss.xml`.
- **Change:** `site.url` in `lib/content.ts` set to `https://www.bestseocompany.us`; the hard-coded blog hreflang and the audit bot user-agent use it too.
- **Validated before release:** local crawl of all 98 sitemap URLs: 0 problems, every canonical self-referencing on www; 0 occurrences of `https://bestseocompany.us` in rendered HTML, sitemap, robots and llms.txt.
- **Validate after release:** URL Inspection on `/`, `/industries/roofing-seo`, `/services/local-seo`, `/guides/what-is-seo`, `/pricing`. Expected: user-declared canonical = Google-selected canonical, all on www.
- **Before → after:** declared canonical non-www on 98/98 URLs → www on 98/98 URLs.

### 1.2 Keep `*.vercel.app` duplicates out of the index
- **Reason:** the Vercel hostname serves a full copy of the site.
- **Affected URLs:** every URL on `*.vercel.app` hosts.
- **Change:** `X-Robots-Tag: noindex, nofollow` header for `*.vercel.app` hosts (`next.config.ts`).
- **Validated before release:** request with `Host: bestseocompanyus.vercel.app` returns the header; `Host: www.bestseocompany.us` does not.
- **Validate after release:** run the following and expect the `x-robots-tag: noindex, nofollow` header:

  ```bash
  curl -sI https://bestseocompanyus.vercel.app/
  ```

### 1.3 Homepage LCP: keep the headline, intro and form visible from first paint
- **Reason:** lab LCP 7,108 ms on mobile (poor). The hero "agents build" intro hid the headline, paragraph and form until the animation reached them, and typed the paragraph letter by letter.
- **Affected URL:** `/`.
- **Change:** only decorative layers wait for the agents (badge pill, stickers, #1 badge pop, highlight). Headline rows, intro paragraph and audit form render immediately. The typing effect is removed. Selection boxes, cursors, build line, status bar, Skip and Replay are unchanged.
- **Validated before release:** same lab method as the baseline (mobile, 4× CPU, ~1.6 Mbps, median of 3).
- **Validate after release:** PageSpeed Insights (mobile) for `/`; Search Console → Core Web Vitals once field data exists (needs traffic).
- **Before → after:** LCP **7,108 ms → 1,232 ms**; FCP 1,180 → 1,232 ms; CLS 0.022 → 0.018.

### 1.4 Homepage CLS: fix the case-study stack layout toggle
- **Reason:** layout-shift trace attributed a 0.695 shift to `DIV.cs-cards`. The component enabled its pinned layout from a reduced-motion hook value that starts false and flips one frame later.
- **Affected URL:** `/` (case-study section).
- **Change:** read the media query directly on mount (`components/sections/CaseStack.tsx`).
- **Validated before release:** same lab method, reduced-motion profile.
- **Before → after:** CLS **0.695 → 0** (reduced motion); LCP 1,272 → 1,252 ms.

### 1.5 Measurement: GA4 and lead events
- **Reason:** no GA4 property and no conversion tracking, so the business outcome (leads) couldn't be measured.
- **Affected URLs:** all pages (loader); every form (event).
- **Change:** `components/Analytics.tsx` loads GA4 only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. `generate_lead` fires on every successful form submission, with `form_type`: audit, contact, newsletter, backlink-report, traffic-report, rank-report. `audit_tool_run` fires when the free audit tool completes.
- **Validated before release:** built with a test ID; a contact form submission pushed `["event","generate_lead",{"form_type":"contact","page_path":"/contact"}]`. Built without the ID: no GA script on the page.
- **Validate after release:** create the GA4 property, set the env var, redeploy, submit a test form and see `generate_lead` in GA4 → Realtime. Then mark `generate_lead` as a key event.
- **Before → after:** leads measurable: no → yes (once the ID is set).

### Not changed (deliberately)
- **No pages deleted or merged.** Duplication measured at 17.7% template text on industry pages (max pair overlap 13.5%). There's no evidence of thin or duplicate content, and no index data yet to show Google rejecting pages.
- **Keyword targets unchanged.** No impression data exists yet and volume tools are out of credits; changing targets now would be guessing.

## Batch 2 — 2026-11-19 (lead capture and page experience on money pages)

### 2.1 Mid-page lead form on industry and service pages
- **Reason:** industry and service pages had one lead form, at the very bottom after 9–10 sections. Visitors who are convinced halfway down had no form in view.
- **Affected URLs:** 45 × `/industries/*`, 14 × `/services/*`.
- **Change:** `InlineAudit` card (website + email, four concrete deliverables) after the playbook on industry pages and after the deliverables on service pages. Every submission fires `generate_lead` (`form_type: audit`) with the page path.
- **Validated before release:** forms in `<main>` per page went from 1 → 2 (roofing, local SEO and technical SEO checked).
- **Validate after release:** in GA4, `generate_lead` by `page_path`; compare the share of leads from mid-page vs bottom forms after 30 days.

### 2.2 Interactive local rank grid
- **Reason:** industry and local service pages were text-and-card heavy, with nothing showing what local SEO changes. The grid visualises map-pack coverage. It is labelled as an illustrative example.
- **Affected URLs:** 45 × `/industries/*`; `/services/local-seo`, `/services/google-business-profile-seo`, `/services/multi-location-seo`, `/services/small-business-seo`.
- **Validate after release:** GA4 engagement time on these pages, plus scroll depth if enabled.

### 2.3 Month-by-month timeline and trust cards
- **Reason:** sets expectations (SEO takes months) and answers the main buying objections (contracts, methods, reporting, who does the work). These address early drop-off and low-quality leads.
- **Affected URLs:** 45 × `/industries/*`, 14 × `/services/*`.

### 2.4 Sticky mobile CTA bar
- **Reason:** on phones the header button is hidden below 520px, and the only path to a form was scrolling to it.
- **Affected URLs:** all pages except `/free-seo-audit` and `/contact`, phones and tablets only. It hides near forms, near the footer and while the homepage build bar is visible.
- **Validate after release:** GA4 event `sticky_cta_click`, and leads from `/free-seo-audit` with a referring page.

### Performance check after batch 2 (same lab method, now scrolling the whole page)
| URL | LCP before → after | CLS after | Lead forms in page |
|---|---|---|---|
| /industries/roofing-seo | 1,372 → 1,228 ms | 0.025 | 1 → 2 |
| /services/local-seo | n/a → 1,396 ms | 0 | 1 → 2 |
| /services/technical-seo | n/a → 1,420 ms | 0 | 1 → 2 |
| / | 1,232 → 1,264 ms | 0.099 (full-page scroll; investigate in batch 3) | 1 |

Crawl after batch 2: 98/98 URLs, 0 problems.

## Batch 3 — 2026-11-20 (implement the Semrush keyword map for bestseocompany.us)

Source: *Keyword Research Report* and *Keyword Map CSV* (Semrush US database, Nov 20, 2026; prepared by DEVSYNX). Authority Score 2, so the plan prioritizes "seo for [industry]" terms at KD ≤ 23 (P1/P2). The head terms "seo company", "seo agency" and "best seo company" (KD 49–56) stay long-term targets for the home page; no change was made for them.

### 3.1 Retargeted existing pages: title, H1, primary keyword and first paragraph now use the mapped keyword
| URL | Before (primary) | After (primary) | Volume / KD | Priority |
|---|---|---|---|---|
| /services/ecommerce-seo | ecommerce seo services | **seo services for ecommerce** | 2,400 / 3 | P1 |
| /industries/chiropractor-seo | chiropractor seo (title/H1 already matched) | chiropractor seo, keyword added to intro | 2,400 / 5 | P1 |
| /industries/dental-seo | dental seo | **seo for dentists** (+ local seo for dentists, dental seo) | 2,400 / 7 · 2,400 / 8 · 6,600 / 35 | P1 |
| /industries/accountant-seo | seo for accountants | unchanged (already aligned) | 2,400 / 11 | P1 |
| /industries/wedding-photographer-seo | seo for wedding photographers (title/H1 said "Wedding Photographer SEO") | title and H1 now lead with the keyword | 880 / 12 | P1 |
| /industries/car-dealership-seo → **/industries/car-dealer-seo** | car dealership seo | **seo for car dealers** | 1,900 / 13 | P2 |
| /services/small-business-seo | small business seo services | **seo services for small business** | 3,600 / 14 | P1 |
| /services/local-seo | local seo services | **local seo for small business** | 2,900 / 16 | P1 |
| /industries/med-spa-seo | med spa seo | unchanged (already aligned) | 1,000 / 16 | P1 |
| /industries/hotel-seo | seo for hotels (title said "SEO Company for Hotels") | title, H1 and intro lead with the keyword | 1,900 / 18 | P2 |
| /industries/plumber-seo | plumber seo | **seo for plumbers** | 2,900 / 19 | P1 |
| /industries/law-firm-seo | law firm seo | **seo services for lawyers** | 2,900 / 19 | P1 |
| /industries/roofing-seo | roofing seo | **seo for roofers** (roofing seo kept as secondary) | 2,400 / 21 · 4,400 / 37 | P1 |
| /industries/restaurant-seo | restaurant seo | **seo for restaurants** | 1,900 / 21 | P2 |
| /industries/healthcare-seo → **/industries/medical-seo** | healthcare seo | **seo for doctors** (+ medical seo) | 2,900 / 23 · 4,400 / 28 | P2 |
| /services/technical-seo | technical seo services | unchanged (already aligned) | 6,600 / 26 | P2 |

- **Reason:** the mapped keywords have measured demand and lower difficulty than the variants the pages used. The report's step 2 calls for the "H1, title and first paragraph" to use the mapped keyword.
- **Renames:** both URLs are still unknown to Google (URL Inspection, Nov 19), so renaming costs no rankings. Permanent (308) redirects from the old URLs are in `next.config.ts`, and all internal links were updated.

### 3.2 New pages (status "Check"/"New page" in the map, and not existing on the site)
| URL | Primary keyword | Volume / KD | Priority |
|---|---|---|---|
| /industries/electrician-seo | seo for electricians | 2,400 / 8 | P1 |
| /industries/landscaping-seo | landscaping seo | 1,900 / 19 | P1 |
| /industries/contractor-seo | seo for contractors (+ seo for construction companies) | 3,600 / 20 · 2,400 / 23 | P1 / P2 |
| /industries/personal-injury-seo | seo for personal injury lawyers | 1,900 / 20 | P1 |
| /industries/architect-seo | seo for architects | 1,900 / 15 | P2 |
| /services/white-label-seo | white label seo | 8,100 / 27 | P2 |

### 3.3 Keyword ownership cleanup (report section 1)
Removed secondary keywords that the report assigns to sister sites, so our pages don't compete with them:
| URL | Removed | Owner site | Replaced with |
|---|---|---|---|
| /industries/mass-tort-seo | mass tort marketing, mass tort lead generation, mass tort case acquisition | scalewithads.us | mass tort law firm seo, mass tort seo agency |
| /industries/car-accident-lawyer-seo | motor vehicle accident attorney marketing | scalewithads.us | motor vehicle accident attorney seo |
| /industries/final-expense-insurance-seo | final expense leads seo, burial insurance marketing | scalewithads.us | final expense agency seo, burial insurance agency seo |
| /industries/roofing-seo | roofing company marketing | roofingsystems.co | roofing company seo |
| /industries/chiropractor-seo | chiropractic marketing, chiropractor marketing services | milliondollarfunnels.us | chiropractor seo services, local seo for chiropractors |
| /industries/hvac-seo | hvac marketing | milliondollarfunnels.us | hvac company seo |
| /industries/solar-seo | solar marketing, solar lead generation seo | milliondollarfunnels.us | solar company seo, seo for solar installers |
| /industries/home-services-seo | home service marketing; contractor seo, local seo for contractors (now owned by /industries/contractor-seo) | milliondollarfunnels.us / internal | home service business seo, home service company seo, local seo for home services |

### Validation
- **Before release:** build, crawl of every sitemap URL (status, single H1, title, description, canonical, OG, JSON-LD), mapped keyword present in title + H1 + intro for every mapped page, old URLs return 308 to the new ones, keyword-map export shows no duplicate primary keywords.
- **After release:** Search Console → Performance, filtered by each mapped keyword (impressions and average position), weekly. Semrush Position Tracking for all P1/P2 keywords (report step 6).

### Not done here (needs access we don't have)
- **Report step 5:** review the 29,800 backlinks from 79 referring domains. This needs Semrush (Backlink Audit) or Search Console → Links. Disavow only links that are clearly paid or spam networks; Google ignores most low-quality links on its own.

## Batch 4 · 2026-11-23 · Internal links (from 03-TECHNICAL-AUDIT.md)

**Why:** 16 key pages were "Discovered – currently not indexed" in Google and 13 pages had fewer than 3 links from page text. Google uses in-content links from already indexed pages to decide what to crawl next.

| Change | Where | Before → after (in-content links in) |
|---|---|---|
| "See pricing" buttons and the nav entry pointed to `/#pricing` (a homepage anchor). They now point to the real `/pricing` page. | `app/services/[slug]`, `app/industries/[slug]`, `lib/content.ts` | `/pricing`: 1 → 66 |
| TrustStrip cards link to `/pricing` ("See plans and pricing") and `/about` ("Meet the team"). | `components/pages/TrustStrip.tsx` (all industry and service pages) | `/about`: 1 → 66 |
| Lead band adds "Prefer to talk first? Contact our team". | `components/pages/LeadBand.tsx` | `/contact`: 1 → 94 |
| Related industries: plumber, HVAC and home services → electrician. Roofing and painting → contractor. Law firm and car accident → personal injury. Fence and pool → landscaping. Medical and dental → veterinary. | `lib/pages/industries-a/b/c.ts` | electrician 2 → 5, contractor 3 → 5, personal injury 2 → 4, landscaping 2 → 4, veterinary 2 → 4 |
| Related services: SEO packages and link building → white-label. Ecommerce → enterprise. | `lib/pages/services.ts` | white-label 2 → 4, enterprise 7 → 8 |
| Guides "Read next": what-is-seo → best-seo-agency-usa. best-seo-strategy → ai-seo-services. seo-keyword-research → what-is-seo. how-to-improve-seo → core-web-vitals-inp. track-seo-rankings → seo-site-migration-checklist. ai-seo-services → ai-overviews-local-businesses. Each swap replaces a link to a page that already has 60+ links. | `lib/pages/guides-1/2/3.ts` | best-seo-agency-usa 3 → 4, ai-seo-services 3 → 4, what-is-seo 2 → 3 |
| Blog "Read next": GBP checklist → local citations. Service pages → CWV/INP. CWV/INP → migration checklist. Google reviews → AI overviews. | `lib/pages/blog.ts` | every blog post now has ≥ 3 |
| A related grid with 4 cards uses 2 columns from 800px and 4 columns from 1100px, so no card sits alone. | `app/pages.css` | layout only |

**Validation:** build OK. A crawl of all 104 pages shows 0 problems (canonical, meta, JSON-LD, 1 H1). Pages with fewer than 3 in-content links: 17 → 4, and only site-map/privacy/terms/editorial remain, which is intended. Click depth is unchanged (max 2).
**Measure:** URL Inspection on the 16 "Discovered" URLs, 7 days after the owner requests indexing.

## Batch 5 · 2026-11-23 · Top 10 push (plan in 04-TOP10-PLAN.md)

| Change | Page | Before | After | Reason |
|---|---|---|---|---|
| Title and meta description | / | "Best SEO Company \| US SEO Agency for Local & National Growth"; generic description | "Best SEO Company in the USA \| First Results in 90 Days"; the description now leads with the offer (free audit in 48h, from $1,500/mo, month to month) | CTR was 0.1% on 1,610 impressions |
| New H2 section "An SEO agency in the USA, for US search" with 3 cards (services, industries, pricing) | / | none | added | "seo agency in usa" at position 10.6 |
| 2 FAQs added to the FAQPage schema (7 total) | / | 5 | 7 | Same |
| 4 industry chips added: contractors, plumbers, electricians, chiropractors | / | 12 | 16 | Phase 1: link P1 pages from the homepage |
| Title, H1 and description now target "seo services in us" | /services | "SEO Services \| Local, Technical, AEO & More", H1 "Every way we grow your search traffic." | "SEO Services in the US \| Best SEO Company", H1 "SEO services in the US that grow your search traffic." | "seo services in us" at position 13.1 |
| H2 sections "Which SEO service do you need?" and "How our SEO services work", plus 5 FAQs with FAQPage schema | /services | 337 words, no FAQ | about 900 words, 5 FAQs | Same |
| 5th FAQ (target keyword wording) and a "Local proof you'll see every month" section | contractor, plumber, law-firm, chiropractor, dental, electrician | 4 FAQs, no proof section | 5 FAQs, 4 proof cards | Plan task 3. Proof describes what is reported; no invented results |
| "The proof in every report" section | /services/small-business-seo, /services/ecommerce-seo | none | 4 proof cards | Same |
| Optional `caseResult` slot on industry and service templates | templates | n/a | renders only when real data is added | No invented results |
| Overlap fix: "seo pricing" removed from SEO Packages; title and H1 no longer say pricing | /services/seo-packages | "SEO Packages & Pricing for US Businesses" | "SEO Packages for US Businesses: What Each Includes" | /pricing owns "seo pricing" |
| Overlap fix: "seo services" removed from homepage and layout keywords; the homepage links to /services with the anchor "SEO services in the US" | /, layout | homepage meta keywords included "seo services" | homepage targets brand terms + "seo agency in usa" | /services owns "seo services" |
| Em dashes replaced with en dashes in the pricing table | /pricing | "—" | "–" | Brief rule: no em dashes |
| New article "Plumber SEO Checklist: 21 Fixes That Bring More Calls" | /blog/plumber-seo-checklist | n/a | new | Phase 5; links to plumber, electrician, contractor, small business |
| New article "How Long Does SEO Take for a Small Business?" | /blog/how-long-does-seo-take | n/a | new | Phase 5; links to contractor, dental, plumber, electrician, chiropractor, small business |
| Articles support inline `[text](/path)` internal links | ArticleBody | none | site-relative only | Contextual links to money pages |
| `seo-export` now includes core pages and reports secondary/primary overlaps | scripts/seo-export.mts | 91 rows, no overlap check | 98 rows, overlap check: 0 | Plan task 4 |
| `docs/disavow.txt` template | docs | n/a | instructions, no domains | No backlink export available (OpenSEO had no credits) |
| Sister-site footer links | Footer | already removed in batch 3 | confirmed 0 links to sister sites | Plan task 5 |

**Validation:**
- Build OK. Crawl of 106 sitemap URLs: 0 problems.
- All 15 target pages:
  - return 200
  - have 1 H1 containing the keyword and the keyword in the title
  - have valid JSON-LD and 5 FAQs (3 on the articles)
- 0 em dashes in rendered text across all pages.
- Keyword map: 0 duplicate primaries, 0 overlaps.

## Batch 6 · 2026-11-23 · Unique content for 5 pages (CLAUDE_CODE_CONTENT_bestseocompany.md)

**7-day note:** all 5 pages were edited earlier today in batch 4 (related links) and batch 5 (5th FAQ, proof sections). The content file names these pages, so the full copy was applied.
- The batch 5 FAQs are replaced by the file's FAQs.
- The batch 5 proof sections stay. The file allows them.

**No UI change:** same components, layout, section order and item counts. Only text changed. Where the file gave 5 playbook or process steps and the page has 4 slots, the last two steps share one card.

| Page | Title before → after | Description | H1 | Copy replaced | FAQs |
|---|---|---|---|---|---|
| /services/small-business-seo | "SEO Services for Small Business \| Best SEO Company" → "SEO Services for Small Business \| Bestseocompany.us" (51) | new (146) | "SEO Services for Small Business Budgets" | explained, 6 deliverables, cost paragraph (new), service area, 4 steps, six-month intro | 5 → 6 |
| /services/local-seo | "Local SEO for Small Business \| Best SEO Company" → "Local SEO for Small Business That Brings Calls" (46) | new (154) | unchanged text | explained, "Why local SEO matters" paragraph (new), 6 deliverables, service area, 5 steps in 4 cards | 5 → 6 |
| /industries/contractor-seo | "SEO for Contractors & Construction Companies" → "SEO for Contractors and Construction Companies" (46) | new (149) | unchanged | challenges intro, map pack, 6 searches, playbook (5 in 4), 5 quick wins, included | 5 → 6 |
| /industries/plumber-seo | "SEO for Plumbers: More Booked Calls \| Best SEO Company" → "SEO for Plumbers: More Service Calls From Google" (48) | new (132) | unchanged | same sections as contractor | 5 → 5 (new set) |
| /industries/law-firm-seo | "SEO Services for Lawyers & Law Firms \| Best SEO Company" → "SEO Services for Lawyers That Bring Real Cases" (46) | new (134) | unchanged | same sections as contractor | 5 → 6 |

**In-text links:**
- **small-business-seo** → local-seo, contractor, plumber, law-firm
- **contractor-seo** → local-seo, roofing ("roofers"), plumber, small-business
- **local-seo** → small-business, plumber, contractor, law-firm
- **plumber-seo** → local-seo, contractor, small-business
- **law-firm-seo** → personal-injury ("SEO for personal injury lawyers"), local-seo, small-business

**Code:**
- New optional text fields:
  - industry pages: `challengesIntro`, `mapPackCopy`, `includedCopy`
  - service pages: `explainNote`, `costNote`, `serviceAreaCopy`, `timelineCopy`
- Pages without these fields render exactly as before.
- `[label](/path)` link support moved to `components/ui/Rich.tsx` and is shared with the articles.

**Validation:**
- Build OK. Crawl of 106 URLs: 0 problems.
- Each page: 1 H1, title under 60, description under 155, FAQPage JSON-LD identical to the visible questions and answers, no horizontal overflow at 390px.
- 0 em dashes. Keyword map: 0 duplicates, 0 overlaps.

## Batch 7 · 2026-11-24 · Real Search Console results

**Source:** 10 Google Search Console screenshots from client projects of our partner agency, shared with permission (the owner asked not to name the partner).

**Display rules:**
- Each result is labelled as partner work, never as our own clients.
- Client names are hidden. The one name in the source index was replaced with "Student education platform".
- Figures and periods are exactly as shown in each screenshot. Periods come from the chart dates.

| Change | Where | Before | After |
|---|---|---|---|
| New page "SEO Results: Real Google Search Console Reports" with all 10 reports | /results | none | 10 cards: screenshot, client type, period, clicks, impressions, CTR, position |
| Homepage results section | / | "Sample case studies, replace with your own" (invented Austin Plumbing etc.) | 3 real reports plus a "See all 10 results" button (CaseStack removed from the homepage; the component file is kept) |
| Results links | header mega menu, footer, nav, /site-map, sitemap.xml | /#results, "Example client outcomes." | /results, "Real Search Console reports." |
| Images | public/gsc/*.webp | n/a | 10 WebP files, 16 to 43 KB each, lazy-loaded with width and height set |

**Validation:** build OK, 107 sitemap URLs crawl with 0 problems, /results has 1 H1 and a unique title and description, all 10 images load, no overflow at 390px.

**Still SAMPLE on the homepage:** hero stats, about bento stats, dashboard reel and testimonials.

## Batch 8 · 2026-11-24 · Proof loop section on the homepage

**Source:** the "Proof loop" section kit (design and CSS only).

| Change | Where | Before | After |
|---|---|---|---|
| Dark auto-scrolling row of tilted window cards (CSS only; pauses on hover or focus; static and scrollable with reduced motion) | / (#results) | 3 static result cards | All 10 Search Console reports on a loop, with a "See all results" button to /results |
| Card data | components/sections/ProofLoop.tsx | n/a | Uses lib/results.ts (same 10 reports as /results). Tag = business type, caption = period, right label = clicks |
| Kit CSS adapted | app/globals.css | n/a | Site fonts. Edge fades changed to a mask so the background glow shows through. Long tags truncate on one line |

**Kit images NOT used:** the 9 screenshots in the kit are partner client video calls. They were left out because:
- they show faces and readable names, such as "George Roros"
- they show ads and funnels material (Meta Ads ROAS table, Instagram insights, a high-ticket clients landing page), which is outside this site's SEO-only niche
- the kit tags labelled them as SEO work ("Rank tracking", "Technical audit", "Keyword mapping") they do not show

**Footer text is accurate:** "10 Search Console reports", "Figures exactly as Google shows them", "Shared with permission". The kit's "Live recording" and "Real client sessions" labels were dropped because they do not describe these images.

**Validation:** build OK, 0 crawl problems, all 10 images load, the animation runs, no overflow at 390px and 1280px, 1 H1 on the homepage.

## Batch 7 · 2026-11-24 · Results shown one by one (owner request)

| Change | Before | After |
|---|---|---|
| Homepage results section | "Proof loop": a dark, auto-scrolling row of small tilted windows with all 10 reports | "Real results from Search Console.": 3 results, each in its own full-width row (education website, publisher network, home services company), plus a "See all 10 results" button |
| /results | 3-column grid of small cards | 10 full-width rows. Each row has a large screenshot beside its clicks, impressions, CTR and average position, alternating left and right |
| Code | `components/sections/ProofLoop.tsx` and its CSS (about 50 lines) | removed. `GscResults` now takes `ids` to pick which reports to show |

The figures are unchanged and come from `lib/results.ts`, exactly as Google shows them.
**Validation:**
- Build OK. Crawl: 0 problems.
- Homepage shows 3 rows and /results shows 10. No overflow at 390px or 1366px.

## Batch 8 · 2026-11-24 · Proof loop section above the footer (owner request, RankEmpire kit)

- **What:** a new dark "Proof loop" band on the homepage only, placed after the final CTA and directly above the footer. It is an auto-scrolling row of 9 recorded client-call screenshots that pauses on hover. No other section was changed or moved.
- **Files:**
  - `components/sections/ProofLoop.tsx`
  - `app/proof-loop.css` (kit CSS scoped to `.pmq`, plus site fonts), imported by `app/page.tsx` only
  - 9 images in `public/proof/`, about 340 KB in total, all lazy-loaded
- **Footer spacing:** the footer's 40px top margin is removed only when this section is the last thing on the page, so the dark band meets the dark footer. Other pages are unchanged; checked on /pricing.
- **Captions:** the kit's tags ("Rank tracking", "Technical audit", "Keyword mapping") did not match the screenshots. The screenshots show video calls, an ads report, a landing page and Instagram insights. Tags, captions and alt text now describe what each image shows, and nothing is labelled as an SEO result.
- **Copy:**
  - Heading: "Inside our client sessions, on a loop."
  - Intro: "Recorded calls from real client work by our partner team, published with permission."
  - The button goes to /results.
- **Owner to confirm:**
  - The people shown agreed to appear on bestseocompany.us, not only on rankempire.us.
  - Some screenshots show participant names, for example "George Roros" and "Gaurav Kapoor". The kit's own guide says to blur names.
- **Validation:**
  - Build OK. Crawl: 0 problems.
  - No horizontal overflow at 390px or 1366px.
  - Section order checked: blog, FAQ, CTA, proof loop, then the footer.

## Batch 9 · 2026-11-24 · Proof loop: pause on click, not hover (owner request)

| Before | After |
|---|---|
| The row stopped whenever the cursor was over the section | The row keeps scrolling on hover |
| No other way to pause | Clicking a card pauses the row and lifts that card. Clicking the same card again, or anywhere outside the row, resumes it. Another card can be clicked while paused. |
| Keyboard focus paused it | Each card is a focusable button: Enter or Space pauses and resumes, with a focus outline |

The intro text now says "Click any window to pause and look closer." The component became a small client component; the CSS changed only for the pause rule and the lifted-card state.
**Validation:**
- Tested in Chromium with the outcomes above.
- Build OK.

## Batch 10 · 2026-11-24 · Proof loop: button position and site colors (owner request)

- **Button:** "See our results" now sits on its own line under the three trust points, left-aligned with them. It was floating to the far right.
- **Colors:** the dark RankEmpire styling is replaced by the site palette:
  - background: white with lavender, pink, lime and taupe glows
  - cards: framed in lavender, pink, lime and taupe in rotation, with black borders and white tags
  - text: black; the heading accent "on a loop." has a lime highlight
  - button: black pill, like the site's other buttons
- **Edge fade:** the kit's dark edge strips are removed and replaced with a transparent mask, so the colors show through at both sides.

**Validation:** build OK. No overflow at 390px or 1366px. Click to pause still works.

## Batch 11 · 2026-11-24 · Footer redesign (owner request)

| Area | Before | After |
|---|---|---|
| Layout | The left column stacked logo, contact, newsletter and the Google button, running far taller than the link columns | Brand column (logo, tagline, email, hours, Google button) beside 5 link columns of similar height |
| Link columns | Plain headings, bright links | Headings with a divider line, muted links that brighten on hover, lime "All ..." links |
| Newsletter | Small field squeezed into the left column | Full-width strip: "One practical SEO email a month." beside the email field and a lime Subscribe button. Fits on mobile. |
| Wordmark | "bestseo.us" on one line in near-invisible dark gray | Two lines, "best" / "seo.us", tinted lavender, pink and green with a lime dot; each letter lights up on hover |
| Right of wordmark | empty | Closing line "Rank #1 with Best SEO Company..." and a "Get my free audit" button |
| Legal bar | unchanged | unchanged, with more space above |

The CTA band at the top of the footer, all links, the newsletter form handler and the Google preferred source button behave exactly as before.
**Validation:**
- Build OK. Crawl: 0 problems.
- No overflow at 390px, 820px and 1366px. Checked on / and /pricing.

## Batch 12 · 2026-11-24 · Footer wordmark: "best" / "seocompany.us" (owner request)

- **Text:** the second line now reads the full domain, "seocompany.us", not "seo.us".
- **Colors:** "best" lavender, "seo" pink, "company" taupe, dot lime, "us" green.
- **Size:** `clamp(38px,13.4vw,170px)`, so the 13-letter line fits from 360px to 1600px+ wide (measured, never clipped). There is extra bottom room so the descenders of "p" and "y" show.
- **Closing call to action:** shortened to "Rank #1 with Best SEO Company. Start with a free 40-point audit." It sits beside "best" from 1200px wide and below the wordmark on smaller screens, where it would otherwise overlap.

**Validation:** build OK. Crawl: 0 problems. No overflow at 360, 390, 820, 1024, 1200, 1366 and 1600px.

## Batch 13 · 2026-11-24 · Footer fully redesigned and animated (owner request)

**New look:** dark ink base in the site palette (lavender, pink, lime, taupe).

**Background**
- Four slowly drifting color glows ("aurora").
- A moving 3D perspective grid floor behind the wordmark.
- Two floating glass orbs placed in empty space (checked: they never cover text at 1200 to 1440px; hidden below 1100px).

**CTA band** (only on pages without their own lead section)
- Pulsing eyebrow dot.
- "rank?" in an animated color gradient.
- Pill buttons with a sliding fill on hover.

**Service ticker:** a scrolling row of services, alternating solid and outline text, with spinning color stars. It slows down on hover.

**Columns**
- Each column has its own accent color: a diamond that spins on hover, and a heading underline that draws in on reveal.
- Links slide right with an arrow and a colored underline.
- "All ..." links widen their arrow gap on hover.

**Brand block**
- The logo mark flips in 3D on hover.
- The email has a gradient underline.
- The hours have a live "ping" dot.

**Newsletter**
- Rotating rainbow gradient border.
- 3D tilt toward the cursor, with a soft spotlight that follows it.
- Glowing focus ring on the email field.

**Wordmark** "best" / "seocompany.us"
- 3D extruded letters in theme tints.
- The whole word tilts in 3D toward the cursor.
- Letters flip in one by one when the footer scrolls into view.
- Hovered letters lift, light up and glow.
- The lime dot bounces.

**Legal bar**
- Animated underlines.
- The back-to-top button is a ring that fills as you scroll down the page.

**Performance and accessibility**
- Animations pause while the footer is off screen.
- Everything is static with prefers-reduced-motion.
- Content is fully visible without JavaScript.

**Files**
- New `app/footer.css`; the old footer block was removed from `app/pages.css`.
- `components/layout/Footer.tsx` rewritten. Same links, forms, newsletter handler and Google button.

**Validation**
- Build OK. Crawl: 0 problems.
- No overflow at 390px or 1366px.
- Tested: reveal, hover lift, 3D tilt and the progress ring (full at page bottom).
