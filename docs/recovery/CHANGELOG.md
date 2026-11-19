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
