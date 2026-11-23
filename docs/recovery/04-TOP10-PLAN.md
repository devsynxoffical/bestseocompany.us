# 04 · Top 10 push: bestseocompany.us

**Source:** "SEO Review and Top 10 Plan" (DEVSYNX, 23 Nov 2026), the matching Top 10 targets CSV and `CLAUDE_CODE_TOP10_bestseocompany_us.md`.
**Scope:** bestseocompany.us only. The plan's sister-site work (milliondollarfunnels.us, milliondollarmedia.us, scalewithads.us, roofingsystems.co) is out of scope for this repository.

## Baseline (GSC, 28 days to 21 Nov 2026)
- **Overall:** 1,610 impressions in 5 days, 2 clicks (0.1% CTR), average position 30.4, 237 queries.
- **Impression targets:** 10,000 at 30 days, 20,000 at 60 days, 35,000 at 90 days.
- **Top 10 goal:** at least 5 of the keywords below in the top 10 by day 90.

## Keyword targets and page owners
| Keyword | Volume | KD | Page (one owner per keyword) | Position 21 Nov | Done on 23 Nov |
|---|---|---|---|---|---|
| seo services for small business | 3,600 | 14 | /services/small-business-seo | not ranking | Proof section, linked from the new articles |
| seo for contractors | 3,600 | 20 | /industries/contractor-seo | not ranking | 5th FAQ, local proof, homepage link |
| local seo for small business | 2,900 | 16 | /services/local-seo | not ranking | Linked from the services hub picker and the plumber checklist |
| seo for plumbers | 2,900 | 19 | /industries/plumber-seo | not ranking | 5th FAQ, local proof, homepage link, checklist article |
| seo services for lawyers | 2,900 | 19 | /industries/law-firm-seo | not ranking | 5th FAQ, local proof |
| seo services for ecommerce | 2,400 | 3 | /services/ecommerce-seo | not ranking | Proof section, services hub picker |
| chiropractor seo | 2,400 | 5 | /industries/chiropractor-seo | not ranking | 5th FAQ, local proof, homepage link |
| seo for dentist / local seo for dentists | 2,400 / 2,400 | 7 / 8 | /industries/dental-seo | not ranking | 5th FAQ ("What does local SEO for dentists include?"), local proof |
| seo for electricians | 2,400 | 8 | /industries/electrician-seo | not ranking | 5th FAQ, local proof, homepage link |
| best seo company / top seo company | high | high | / | 36.0 / 22.6 | New title and description for CTR |
| seo agency in usa | | | / | 10.6 | H2 section "An SEO agency in the USA, for US search", FAQ |
| seo services in us | | | /services | 13.1 | Title, H1, 3 H2 sections, 5 FAQs with schema |
| seo pricing | | | /pricing | | Removed from /services/seo-packages (overlap fix) |

## Owner tasks (manual, not code)
1. **Search Console Domain property:** add `bestseocompany.us` as a Domain property (DNS TXT record) so www, non-www and http data are all captured.
2. **Sitemap and indexing requests:** resubmit `https://www.bestseocompany.us/sitemap.xml`. In URL Inspection, request indexing for up to 10 pages a day, in this order:
   - **Day 1:**
     - `/` and `/services`
     - `/services/small-business-seo`, `/industries/contractor-seo`, `/services/local-seo`, `/industries/plumber-seo`
     - `/industries/law-firm-seo`, `/services/ecommerce-seo`, `/industries/chiropractor-seo`, `/industries/dental-seo`
   - **Day 2:**
     - `/industries/electrician-seo` and `/pricing`
     - `/blog/plumber-seo-checklist`, `/blog/how-long-does-seo-take`
     - Then the remaining "Discovered" pages from `03-TECHNICAL-AUDIT.md`
3. **Disavow:**
   - Export referring domains from Semrush and fill `docs/disavow.txt` (instructions are in the file).
   - Upload it in Search Console.
   - Remove or 301 the old `keywordkrusher.bestseocompany.us` subdomain.
4. **Real proof:**
   - The homepage case studies, stats and testimonials are still labelled SAMPLE. Send real numbers and reviews.
   - Industry and service pages now have a hidden `caseResult` slot that appears as soon as a verified result is added to the page data.
5. **Authority:** 10 to 15 clean links a month:
   - Agency directories: Clutch, GoodFirms, DesignRush, Sortlist, UpCity.
   - Business profiles: Crunchbase, LinkedIn company page, Trustpilot, BBB.
   - 2 guest posts a month.
   - Expert quotes through Qwoted and Featured.
6. **Content rhythm:** 2 new articles a week on low-difficulty SEO questions that link to the industry pages. The first two were published on 23 Nov.

## Weekly check
- **GSC:** impressions, clicks, CTR and position, plus newly indexed pages. Compare against the baseline above.
- **Rankings:** position for the 14 keywords in the table.
- **Code:** run `npm run seo:export`. Both "Duplicate primary keywords" and "Secondary/primary overlaps" must stay at 0.
