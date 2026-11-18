# bestseocompany.us

Homepage for **Best SEO Company**, a US-based SEO agency. Built with **Next.js 16 (App Router)**, **React 19** and **TypeScript**. It has no UI or animation libraries: every effect is hand-written CSS and small React hooks, so the bundle stays light.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static)
npm start          # serve the production build
npm run typecheck  # TypeScript only
```

Requires Node.js 20 or newer.

## Deploy

The page is fully static, so any Node host or static host works.

- **Vercel**: import the repo. No settings needed.
- **cPanel / shared hosting**: add `output: "export"` to `next.config.ts`, run `npm run build`, and upload the generated `out/` folder to `public_html`. (Remove the `headers()` block first; static export doesn't support it.)

## Project structure

```
app/
  layout.tsx            Fonts (next/font), metadata, viewport
  page.tsx              Puts the sections together in order
  globals.css           Design tokens + all section styles
  sitemap.ts            /sitemap.xml
  robots.ts             /robots.txt
  opengraph-image.tsx   Social share image (generated)
  icon.svg              Favicon
components/
  layout/               Header, Footer, ScrollProgress, CustomCursor
  sections/             One file per homepage section (see below)
  ui/                   Reveal, SplitText, CountUp, MagneticLink, Globe, Logo
  StructuredData.tsx    JSON-LD (ProfessionalService, WebSite, FAQPage)
hooks/                  useReveal, useRafLoop, useReducedMotion
lib/
  content.ts            ALL page copy and numbers: edit text here
  utils.ts              clamp, easing, number formatting
```

## Sections and their motion

| # | Section | File | Motion |
|---|---------|------|--------|
| 1 | Hero | `Hero.tsx` | **Built live by 9 SEO agents**: named cursors draw selection boxes with live size labels, slide in the headline rows, click the highlight and #1 badge, type the paragraph, swarm the form and drag the stat stickers in. A status bar counts layers with Skip / Replay. Stickers follow the mouse afterwards |
| 2 | Ticker bands | `Marquees.tsx` | Two tilted bands; speed, direction and skew react to scroll velocity |
| 3 | About statement | `Statement.tsx` | Words fill grey → ink while scrolling; stats count up |
| 4 | "We help ___" | `WhoWeHelp.tsx` | Rotating audience word with resizing highlight; industry pills tilt in |
| 5 | Floating 3D SEO objects | `FloatingSeo.tsx` | Magnifier, #1 coin, map pin, review card, chart, search bar etc. drift at different scroll speeds and tilt toward the mouse |
| 6 | Services folder tabs | `Services.tsx`, `ServiceVisuals.tsx` | Autoplaying tabs with progress bar; gauges fill, search query types, map pins drop, link chart draws |
| 7 | About bento grid | `AboutBento.tsx`, `ui/Globe.tsx` | Tiles tilt in 3D with glare, floating principle card, draggable canvas globe, laurels grow, live cursors, looping stepper |
| 8 | Reporting dashboard | `DashboardReel.tsx` | Panel scales to full size on scroll; KPIs count up; bars rise |
| 9 | Why us | `WhyUs.tsx` | Sticky cards stack and shrink underneath |
| 10 | Case studies | `CaseStack.tsx` | Pinned card stack; each card slides over the last; crossing ribbons change colour/words per case |
| 11 | Before / after | `BeforeAfter.tsx` | Draggable comparison slider that sways until touched |
| 12 | Process | `Process.tsx` | Progress line fills with scroll and lights each step |
| 13 | Testimonials | `Testimonials.tsx` | Infinite quote row, pauses on hover |
| 14 | Pricing | `Pricing.tsx` | Sliding Monthly/Yearly toggle, prices tween |
| 15 | Blog | `Blog.tsx` | Thumbnail zoom, underline grows on hover |
| 16 | FAQ | `Faq.tsx` | Smooth-height accordion |
| 17 | Call to action | `Cta.tsx` | Clip reveal, spinning badge, drifting blobs |
| — | Footer | `layout/Footer.tsx` | Wordmark letters rise in; newsletter form |

Site-wide: scroll progress bar, hide-on-scroll header, custom cursor with labels (`data-cursor="Label"` on any element), magnetic buttons, word-by-word heading reveals.

### How the hero build works

`app/layout.tsx` has a tiny inline script that adds `hero-build` to `<html>` before first paint (skipped for reduced motion), so hero layers start hidden with no flash. `Hero.tsx` measures each layer, then runs a timed script of cursor moves, box growth and reveals. If the page hasn't hydrated within 8 seconds, the script removes the class and the plain hero shows. To tweak timing, edit the millisecond values in `run()`; agent names and colours are in `AGENTS`.

### How reveals work

`useReveal` keeps the page complete without JavaScript: everything renders visible on the server, and only elements that start **below the fold** get the hidden `pre` class until they scroll into view. Visitors with **reduced motion** turned on get a still page: no reveals, autoplay, parallax or pinned stacks.

## Content pages (81 URLs)

| Section | URL | Count | Content file | Template |
|---|---|---|---|---|
| Industries | `/industries/[slug]` (+ searchable hub `/industries`) | 45 | `lib/pages/industries-a.ts`, `-b.ts`, `-c.ts` | `app/industries/[slug]/page.tsx` |
| Services | `/services/[slug]` (+ hub `/services`) | 14 | `lib/pages/services.ts` | `app/services/[slug]/page.tsx` |
| Free tools | `/tools/[slug]` (`/tools` redirects to the hub) | 5 | `lib/pages/tools.ts` | `app/tools/[slug]/page.tsx` |
| Guides | `/guides/[slug]` (+ hub `/guides`) | 13 | `lib/pages/guides-1.ts`, `-2.ts`, `-3.ts` | `app/guides/[slug]/page.tsx` |

Each content file is plain typed data (`lib/pages/types.ts`); edit copy there. Every page ships with its own title, meta description, canonical URL, Open Graph tags, breadcrumbs and JSON-LD (Service / WebApplication / Article + FAQPage + BreadcrumbList), and is listed in `/sitemap.xml`. Pages are statically generated at build time.

Merged keywords (to avoid pages competing with each other): **Dental + Dentist** → `/industries/dental-seo`; **MVA + Car Accident Lawyers** → `/industries/car-accident-lawyer-seo`; **Burial Insurance + Final Expense** → `/industries/final-expense-insurance-seo`; **Attorney/Lawyers** → `/industries/law-firm-seo`; **"What is SEO"** (listed twice) → `/guides/what-is-seo`.

### Free SEO audit tool
`/tools/seo-audit-tool` is live: `POST /api/audit` fetches the page server-side and runs ~20 checks (status, redirects, HTTPS, speed, title, description, headings, word count, alt text, links, canonical, robots, viewport, lang, Open Graph, JSON-LD, robots.txt, sitemap). Requests to private/internal addresses, non-standard ports and credentials are blocked on every redirect hop, with a 10s timeout, 3 MB cap and a per-IP rate limit.

The backlink, traffic and rank checkers collect a request (website, email, keywords) for your team to fulfil.

### Forms and leads
Every form posts to `POST /api/lead`. Set **`LEAD_WEBHOOK_URL`** in Vercel → Settings → Environment Variables (a Zapier/Make/Slack/CRM webhook that accepts JSON) to receive them. Without it, leads only appear in Vercel's function logs. See `.env.example`.

## Editing content

Change copy, prices, stats, FAQs and case studies in **`lib/content.ts`**. The FAQ also feeds the FAQPage structured data automatically.

## Before launch: checklist

- [ ] Replace the **SAMPLE** items in `lib/content.ts`: case studies, testimonials, stats (350+, 94%, 4,800+, 38 states…), lead-source split and dashboard numbers. Publishing invented reviews or results can break FTC rules and Google's review policies.
- [ ] Set `LEAD_WEBHOOK_URL` so form submissions reach you, and decide who fulfils backlink / traffic / rank report requests.
- [ ] Add Privacy and Terms pages and link them in the footer.
- [ ] Check `site` details (email, hours, founding year) in `lib/content.ts`.
