# SEO recovery: baseline investigation

_Date: 2026-11-19. Data sources: Google Search Console (property `https://www.bestseocompany.us/`, via OpenSEO), URL Inspection API, lab measurements on the production build (Playwright, mobile 412×823, 4× CPU throttle, ~1.6 Mbps, median of 3 runs). No changes had been made when this was recorded._

## 1. Headline finding

**The site is not underperforming. It has almost no search history to perform with.**

| Metric (Search Console) | Last 28 days (Oct 20 – Nov 16) | Previous 28 days (Sep 22 – Oct 19) | Last 3 months (Aug 17 – Nov 16) | Previous 3 months (May 17 – Aug 16) |
|---|---|---|---|---|
| Impressions | 0 | 0 | 0 | 0 |
| Clicks | 0 | 0 | 0 | 0 |
| Queries | 0 | 0 | 0 | 0 |
| Pages with impressions | 0 | 0 | 0 | 0 |

The 16-month date series returns zero rows. Period-over-period comparison isn't meaningful yet: every period is 0.

**GA4:** no GA4 property exists for bestseocompany.us in either connected Google account, so there are no traffic or conversion numbers to compare. The site has no analytics code.

## 2. Index status (URL Inspection API, 2026-11-19)

| URL | Coverage | Last crawl | Google canonical | Declared canonical |
|---|---|---|---|---|
| https://www.bestseocompany.us/ | Submitted and indexed | 2026-11-18 20:16 UTC | `https://www.bestseocompany.us/` | `https://bestseocompany.us/` ❌ mismatch |
| /industries/roofing-seo | URL is unknown to Google | never | — | — |
| /services/local-seo | URL is unknown to Google | never | — | — |
| /guides/what-is-seo | URL is unknown to Google | never | — | — |
| /pricing | URL is unknown to Google | never | — | — |
| /sitemap.xml | URL is unknown to Google | never | — | — |

Interpretation:
- Google crawled the homepage for the first time on Nov 18. Inner pages haven't been discovered, and the sitemap was never submitted or fetched.
- **Every declared canonical points to `https://bestseocompany.us/...` (non-www), but the site is served and indexed on `https://www.`.** Google ignored our canonical for the homepage and picked www. The same applies to all 98 pages, and also to the sitemap `<loc>` URLs, `og:url`, structured-data URLs, the robots.txt `Host`/`Sitemap` lines and `llms.txt`.

## 3. Problems ranked by business impact

| # | Problem | Evidence | Impact | Effort |
|---|---|---|---|---|
| 1 | **Host mismatch (www vs non-www)** in canonicals, sitemap, robots, schema, OG | URL Inspection: user canonical ≠ Google canonical; local crawl: all 98 canonicals non-www | Blocks discovery of the 97 inner pages through the sitemap; contradictory signals on every page | Low |
| 2 | **Sitemap never submitted / not discovered** | URL Inspection: sitemap.xml "unknown to Google" | Inner pages stay undiscovered; only the homepage is indexed | Low (manual step in Search Console) |
| 3 | **No measurement**: no GA4, no conversion events, form delivery unverified | No GA4 property; `LEAD_WEBHOOK_URL` can't be verified from here | Impossible to know if any visitor converts; can't prove business growth | Low |
| 4 | **Homepage mobile LCP 7.1 s** (poor; good is ≤ 2.5 s) | Lab: LCP 7,108 ms with the hero "build" intro vs 1,272 ms without it; LCP element revealed late | Hurts page experience for real users and the first impression for every paid or organic visitor; Core Web Vitals field data will be poor once collected | Medium |
| 5 | **Homepage CLS 0.695** (poor; good is ≤ 0.1) | Layout-shift trace: source `DIV.cs-cards` (case-study stack toggles its pinned layout on load) | Content jumps on load; Core Web Vitals failure | Low |
| 6 | **Unverifiable claims and placeholder content on the live homepage** | Stats (350+ businesses, 94% retention, 4,800+ keywords, 38 states), case studies labelled "Sample case studies, replace with your own", testimonials signed "Client name" | Destroys trust for any visitor who arrives; fabricated reviews and results are an FTC and Google-policy risk | Needs real data from the business |
| 7 | **New domain with no authority, launched with 98 pages at once** | 0 impressions; no backlink data (tools out of credits) | Head terms ("best seo company", "seo company usa", "local seo services") are dominated by established agencies; a new domain won't rank for them in the near term regardless of on-page work | Long-term |
| 8 | **Competitor and keyword data unavailable** | OpenSEO: `INSUFFICIENT_CREDITS` for SERP, volume and backlink tools | Keyword choices can't be validated with volumes yet | Needs credits |

### What the data does **not** support
- **"We created duplicate thin pages."** Measured on the rendered HTML: industry pages average ~975 words with 17.7% shared template text (~803 unique words each); the most similar pair (wedding photographer vs event planner) overlaps 13.5%. Guides and blog posts are 95%+ unique. That's not a near-duplicate problem, so no page is being deleted on duplication grounds.
- **"The keywords are wrong."** There's no impression data to show which queries Google associates with the site, and volume tools are unavailable. The keyword map isn't proven wrong, and it isn't proven right either. It is, however, unrealistic for the head terms in the short term (see #7).
- **"Inner pages are slow."** Industry, guide and pricing pages measure LCP 1.06–1.41 s, TBT 166–233 ms and CLS 0 in the same lab setup.

### Risk to monitor (not yet evidenced)
98 AI-drafted pages appeared at once on a brand-new domain with no authors, case studies or links. Google may crawl many but index few ("Crawled – currently not indexed"). This can only be measured after the sitemap is processed. The decision rule is in the recovery plan.

## 4. Lab performance baseline (before any change)

| Page | LCP | FCP | TBT | CLS | JS transferred |
|---|---|---|---|---|---|
| / (with intro) | 7,108 ms | 1,180 ms | 471 ms | 0.022 | 161 KB |
| / (reduced motion, no intro) | 1,272 ms | 1,272 ms | 471 ms | 0.695 | 161 KB |
| /industries/roofing-seo | 1,408 ms | 1,100 ms | 202 ms | 0 | 166 KB |
| /guides/seo-cost | 1,060 ms | 1,060 ms | 233 ms | 0 | 165 KB |
| /pricing | 1,360 ms | 1,052 ms | 166 ms | 0 | 164 KB |
