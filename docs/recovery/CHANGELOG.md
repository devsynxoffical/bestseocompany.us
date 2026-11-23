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
