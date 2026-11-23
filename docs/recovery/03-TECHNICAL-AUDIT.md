# 03 · Technical SEO audit: bestseocompany.us

**Date:** 2026-11-23 · **Scope:** www.bestseocompany.us only (no other sites)
**Sources:** Google Search Console (performance + URL Inspection API for 40 URLs), a crawl of all 104 sitemap URLs on a fresh production build, and Playwright mobile tests (390px, 4× CPU, slow 4G).
**Limit:** the audit sandbox's network blocks the live domain, so live headers and DNS were not fetched from here. Google's own crawl data (URL Inspection, Nov 21–22) is the source of truth for the live site.

## Summary

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | Google indexing | ⚠️ **Partial: 16 of 40 inspected URLs indexed** | 16 indexed, 16 "Discovered – currently not indexed", 8 "URL is unknown to Google" (2 of these are expected: a redirect and the sitemap file). |
| 2 | Canonical tags | ✅ Pass (one stale) | All indexed pages: user canonical = Google canonical (www). The homepage was last crawled Nov 18 with the old non-www canonical and needs a recrawl. |
| 3 | Robots / noindex | ✅ Pass | robots.txt allows everything except `/api/`. 0 of 104 pages have noindex (meta or header). Google reports `robotsTxtState: ALLOWED`. |
| 4 | Sitemap | ✅ Pass | 104 URLs, all 200, all self-canonical. Google lists `sitemap.xml` as the discovery source for most URLs. |
| 5 | Internal links | ✅ Pass (minor) | No orphans. Click depth is 0–2 for every page (67 at depth 1, 36 at depth 2). 17 pages get fewer than 3 in-content links (see below). |
| 6 | Rendering | ✅ Pass | Content is server-rendered. Raw HTML word count ≈ rendered word count on every template tested (e.g. roofing 1,376 raw / 1,359 rendered). Google fetches as MOBILE successfully. |
| 7 | Duplicate content | ⚠️ Watch | 0 duplicate titles or descriptions. Industry pages share 37.8% template text (855 unique words on average). The most similar pair is 27.4%, under any duplicate threshold. |
| 8 | Page quality | ⚠️ Fix 2 items | Median 1,304 words. The homepage and 7 other pages still say "sample". Hubs and contact are thin, which is normal for hub pages. |
| 9 | Mobile / speed | ✅ Pass | LCP 1.2–1.7 s, CLS ≤ 0.005, no horizontal overflow, viewport set, on all 7 templates. |
| 10 | Search performance | ⏳ Early stage | The first impressions arrived Nov 18: 4 → 349 → 586 per day by Nov 20, 2 clicks. Every impression goes to the homepage, at average position 23–42. |

**Conclusion:** nothing technical is blocking Google. The site is about 6 days old in Google's index. The not-indexed pages are a crawl-queue and priority issue ("Discovered" means Google knows the URL but has not fetched it yet), not an error. The levers now are recrawl requests, stronger internal links to the queued pages, and authority signals (backlinks, Google Business Profile, real proof).

## 1. Index coverage (URL Inspection, 40 URLs)

**Indexed (16):** `/`, `/blog`, `/services/local-seo`, `/services/ecommerce-seo`, `/services/seo-packages`, `/services/multi-location-seo`, `/services/answer-engine-optimization`, `/services/link-building`, `/industries/dental-seo`, `/industries/plumber-seo`, `/industries/law-firm-seo`, `/industries/roofing-seo`, `/tools/seo-audit-tool`, `/guides/what-is-seo`, `/guides/best-seo-strategy`, `/blog/google-business-profile-checklist`. All were crawled as MOBILE. The breadcrumb rich result is valid on each.

**Discovered – currently not indexed (16):**
- **Hubs and core pages:** `/pricing`, `/services`, `/industries`, `/guides`, `/about`, `/contact`
- **Service pages:** `/services/technical-seo`, `/services/google-seo`, `/services/seo-consultant`, `/services/enterprise-seo`, `/services/shopify-seo`, `/services/white-label-seo`, `/services/generative-engine-optimization`
- **Industry page:** `/industries/contractor-seo`
- **Guides:** `/guides/seo-cost`, `/guides/ai-seo-services`

**Unknown to Google (6 + 2 expected):** `/free-seo-audit`, `/services/small-business-seo`, `/services/google-business-profile-seo`, `/industries/electrician-seo`, `/industries/medical-seo`, `/guides/best-seo-agency-usa`. The batch-3 pages were added Nov 21–22, after Google's last sitemap read. `/industries/healthcare-seo` is a 301 to medical-seo, as intended, and `/sitemap.xml` is a file, not a page.

## 5. Internal links: pages with fewer than 3 in-content links
These pages are reachable from the nav and footer, but few body links point to them:
- **Core pages:** `/pricing` (1), `/about` (1), `/contact` (1), `/services/white-label-seo` (2)
- **Industry pages:** `/industries/veterinary-seo`, `/industries/electrician-seo`, `/industries/landscaping-seo`, `/industries/personal-injury-seo` (2 each)
- **Guides and blog:** `/guides/what-is-seo`, `/blog/ai-overviews-local-businesses`, `/blog/core-web-vitals-inp`, `/blog/local-citations-guide`, `/blog/seo-site-migration-checklist` (2 each)
- **Legal pages** (fine as is): `/privacy`, `/terms`, `/editorial-policy`

## 8. Page-quality flags
- **"Sample" content still live:** the homepage stats, case studies and testimonials are labelled SAMPLE. Replace them with real numbers, reviews and client logos. This is the biggest E-E-A-T gap for a "best SEO company" query.
- **Policy placeholders:** [Legal entity name], [Business address] and [State] in privacy and terms.
- **Thin pages (under 600 words):** `/contact` (69), `/about` (335), `/services` (337), `/free-seo-audit` (357), three tool pages (475–559). Hubs are fine thin. `/about` should grow: team, founding story, address, credentials. It is a trust page for both Google and AI answers.

## 10. Search performance (GSC, last 28 days)
- 166 query rows, all landing on `/`. The head terms are far from page 1:
  - "best seo company": 81 impressions, position 37.9
  - "top seo company": 31 impressions, position 22.3
  - "seo services usa": 27 impressions, position 35.7
- **Clicks (2):** "seo agency in usa" (position 13.9) and "seo services in us" (position 10.7).
- **Near page 1:** question queries such as "what is the best seo agency for the u.s. market?" (position 6.2). `/guides/best-seo-agency-usa` targets exactly this query and is not known to Google yet, so **request its indexing first**.

## Action list (in priority order)

**Owner, in Search Console (about 15 minutes, highest impact):**
1. **Resubmit the sitemap:** Sitemaps → `https://www.bestseocompany.us/sitemap.xml` → Submit.
2. **Request indexing with URL Inspection → "Request indexing"** (about 10 per day):
   - **Day 1:**
     - Core pages: `/` (to pick up the www canonical), `/pricing`, `/services`, `/industries`
     - New pages: `/guides/best-seo-agency-usa`, `/free-seo-audit`, `/services/small-business-seo`, `/services/google-business-profile-seo`, `/industries/medical-seo`, `/industries/electrician-seo`
   - **Day 2:**
     - Services: `/services/technical-seo`, `/services/google-seo`, `/services/seo-consultant`, `/services/shopify-seo`
     - Guides: `/guides/seo-cost`, `/guides/ai-seo-services`, `/guides`
     - Other pages: `/industries/contractor-seo`, `/about`, `/contact`
3. If the site moved to Hostinger, confirm it answers on `https://www.bestseocompany.us` (the `.htaccess` 301 handles non-www). Then check Settings → Crawl stats for host errors.

**Code (next batch, small and measurable):**
4. Add in-content links to the 13 under-linked pages from indexed pages that are related to them. For example:
   - pricing from every service page's lead band
   - electrician and landscaping from the contractor and home-services pages
   - blog posts from the matching guides
5. Expand `/about` to more than 800 words: team, process, address, credentials.

**Owner (authority, which matters more than technical work now):**
6. Replace the SAMPLE stats and testimonials with real ones.
7. Fill the policy placeholders.
8. Set up a Google Business Profile.
9. Get 5–10 real citations or backlinks.

## Re-check
Re-run the URL Inspection on the same 40 URLs about 7 days after the indexing requests, and compare against this file.
