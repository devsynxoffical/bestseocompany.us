# Page-by-page recovery plan

_Written 2026-11-19, after batch 1 and 2. There is no Search Console traffic yet, so this plan is a set of **decision rules**: what to check, when, and what to do with each result. Nothing is decided on opinion._

## Week 0: actions only you can take (they unblock everything else)
| # | Action | Where | Why | How to verify |
|---|---|---|---|---|
| 1 | Confirm `bestseocompany.us` **redirects (308) to `www.`** | Vercel → Settings → Domains | All canonicals now point to www | Run `curl -sI https://bestseocompany.us/`; expect `location: https://www.bestseocompany.us/` |
| 2 | **Submit `https://www.bestseocompany.us/sitemap.xml`** | Search Console → Sitemaps | The sitemap is currently unknown to Google; 97 pages are undiscovered | Sitemaps report: Status "Success", 98 discovered URLs |
| 3 | Request indexing for `/`, `/pricing`, `/free-seo-audit`, `/services/local-seo`, `/services/technical-seo`, `/services/seo-packages` | Search Console → URL Inspection | Speeds up discovery of the money pages | URL Inspection shows "URL is on Google" |
| 4 | Create a GA4 property and set `NEXT_PUBLIC_GA_MEASUREMENT_ID`; mark `generate_lead` as a key event; update the Privacy Policy's cookie section | GA4 + Vercel env | Without it, leads can't be measured | GA4 Realtime shows `generate_lead` after a test submission |
| 5 | Set `LEAD_WEBHOOK_URL` and send yourself a test lead | Vercel env | Leads currently only reach server logs | The test lead arrives in your inbox or CRM |
| 6 | Replace the homepage sample stats, case studies and "Client name" testimonials with real ones, or tell me to remove them | `lib/content.ts` | Visible "Sample … replace with your own" labels and unverifiable claims cost trust on every visit | No "Sample" labels or placeholder names on `/` |
| 7 | Create and verify a **Google Business Profile** and add its URL to `site.sameAs` | GBP + `lib/content.ts` | Brand/entity signal; the homepage is the only indexed page | GBP live; `sameAs` in Organization schema |
| 8 | Top up OpenSEO credits (≈300–500) | OpenSEO billing | Needed for keyword volumes, competitor SERPs and backlink data | `get_keyword_metrics` returns data |

## Page groups and decision rules

### Tier 1: money pages (where leads come from)
`/`, `/pricing`, `/free-seo-audit`, `/contact`, and the 14 `/services/*` pages.
- **Week 2 check:** indexed? (URL Inspection). If not indexed after sitemap submission plus a manual request, check the Page indexing report for the reason before changing anything.
- **Week 4–6:** queries per page (Search Console, query × page). If a page gets impressions for queries it doesn't mention in the title or H1, rewrite the title and H1 for the query with the most impressions.
- **Conversion:** GA4 `generate_lead` per page. A page with more than 100 sessions and 0 leads gets its offer and form position reviewed first.

### Tier 2: 45 industry pages (`/industries/*`)
- **Week 4 check:** Page indexing report. Count the industry URLs under "Crawled – currently not indexed" and "Discovered – currently not indexed".
- **Rule A:** if **more than half** of the industry pages are not indexed at week 8, Google is signalling that it doesn't see enough value in them. Then add first-hand proof (real case studies, named strategist, screenshots from real campaigns) to the 10 industries closest to your actual client base. For the rest, either noindex them or merge them into their category hubs. Decide with the data; don't delete before then.
- **Rule B:** if an industry page has impressions at an average position of 8–20, it's a near-ranking page. Prioritize it for content depth, internal links from the homepage and services, and 1–2 relevant backlinks.
- **Rule C:** if two industry pages rank for the same query (query × page report), consolidate the weaker one into the stronger with a 301.

### Tier 3: 13 guides and 8 blog posts
- These target informational queries. They build topical authority and AI-search citations; they rarely produce direct leads.
- **Week 6+:** keep any page with impressions. Pages with 0 impressions at week 12 that are indexed go to the bottom of the refresh list. Don't publish new posts until existing ones show which topics Google rewards.

### Head terms ("best seo company", "seo company usa", "seo agency")
- Honest expectation: a new domain with no backlinks won't rank on page 1 for these in the coming months, however good the page is. Established agencies with years of links hold these results.
- What can rank sooner: brand searches ("Best SEO Company", "bestseocompany.us"), long-tail industry and service terms, and local and niche combinations.
- What moves the head terms: real authority, meaning agency directory profiles (Clutch, DesignRush, UpCity), partner mentions, digital PR and real case studies. Track monthly with backlink data once credits are available.

## Measurement schedule
| When | What | Tool |
|---|---|---|
| +7 days | Sitemap processed; indexed count | Search Console: Sitemaps, Page indexing |
| +14 days | URL Inspection on the 10 key URLs (canonical = www) | OpenSEO `inspect_urls` |
| +28 days | First 28-day performance: impressions, queries, pages | Search Console |
| +28 days | Leads by page and form type | GA4 |
| +56 days | Apply Rule A/B/C to industry pages | Search Console + this plan |
| Monthly | 28d vs previous 28d; 3m vs previous 3m | Search Console + GA4 |
