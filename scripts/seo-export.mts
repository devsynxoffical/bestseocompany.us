/**
 * Exports docs/keyword-map.csv: one row per indexable content page with its
 * target keyword, title and meta description lengths.
 * Run: npm run seo:export
 */
import { writeFileSync } from "node:fs";
import { industriesA } from "../lib/pages/industries-a.ts";
import { industriesB } from "../lib/pages/industries-b.ts";
import { industriesC } from "../lib/pages/industries-c.ts";
import { industriesD } from "../lib/pages/industries-d.ts";
import { servicesB } from "../lib/pages/services-b.ts";
import { services } from "../lib/pages/services.ts";
import { tools } from "../lib/pages/tools.ts";
import { guides1 } from "../lib/pages/guides-1.ts";
import { guides2 } from "../lib/pages/guides-2.ts";
import { guides3 } from "../lib/pages/guides-3.ts";
import { blogPosts } from "../lib/pages/blog.ts";

const SITE = "https://www.bestseocompany.us";
type Row = [string, string, string, string, string, number, number, string];
const rows: Row[] = [];
// Hand-built pages: one owner per keyword (homepage = brand + "seo agency in usa", /services = "seo services", /pricing = "seo pricing").
const STATIC: Array<[string, string, string, string]> = [
  ["/", "best seo company", "top seo company; best seo company usa; seo agency in usa; us seo agency", "Rank #1 with Best SEO Company."],
  ["/services", "seo services in us", "seo services; seo services usa; seo agency services", "SEO services in the US that grow your search traffic."],
  ["/pricing", "seo pricing", "seo pricing plans; how much is seo per month", "Simple, transparent SEO pricing."],
  ["/industries", "seo by industry", "industry seo; seo for local businesses", "SEO by industry"],
  ["/free-seo-audit", "free seo audit", "seo audit; website seo audit", "Free SEO audit"],
];
for (const [path, pk, sk, h1] of STATIC) rows.push([`${SITE}${path === "/" ? "" : path}`, "Core", pk, sk, "(set in app route)", 0, 0, h1]);
for (const p of [...industriesA, ...industriesB, ...industriesC, ...industriesD]) rows.push([`${SITE}/industries/${p.slug}`, "Industry", p.primaryKeyword, p.secondaryKeywords.join("; "), p.title, p.title.length, p.metaDescription.length, p.h1]);
for (const p of [...services, ...servicesB]) rows.push([`${SITE}/services/${p.slug}`, "Service", p.primaryKeyword, p.secondaryKeywords.join("; "), p.title, p.title.length, p.metaDescription.length, p.h1]);
for (const p of tools) rows.push([`${SITE}/tools/${p.slug}`, "Tool", p.primaryKeyword, p.secondaryKeywords.join("; "), p.title, p.title.length, p.metaDescription.length, p.h1]);
for (const p of [...guides1, ...guides2, ...guides3]) rows.push([`${SITE}/guides/${p.slug}`, "Guide", p.primaryKeyword, "", p.title, p.title.length, p.metaDescription.length, p.question]);
for (const p of blogPosts) rows.push([`${SITE}/blog/${p.slug}`, "Blog", p.primaryKeyword, p.tags.join("; "), p.seoTitle, p.seoTitle.length, p.metaDescription.length, p.title]);

const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
const csv = [["URL", "Type", "Primary keyword", "Secondary keywords / tags", "Title tag", "Title length", "Meta description length", "H1"], ...rows].map((r) => r.map(esc).join(",")).join("\n");
writeFileSync(new URL("../docs/keyword-map.csv", import.meta.url), csv + "\n");

const kw = new Map<string, string[]>();
for (const r of rows) kw.set(r[2].toLowerCase(), [...(kw.get(r[2].toLowerCase()) ?? []), r[0]]);
const dupes = [...kw].filter(([, u]) => u.length > 1);
console.log(`Wrote docs/keyword-map.csv (${rows.length} pages). Duplicate primary keywords: ${dupes.length}`);
dupes.forEach(([k, u]) => console.log(`  "${k}": ${u.join(", ")}`));
// Overlap: a page's secondary keyword that is another page's primary keyword.
const overlaps = rows.flatMap((r) => r[3].split("; ").map((s) => s.trim().toLowerCase()).filter((s) => kw.has(s) && !kw.get(s)!.includes(r[0])).map((s) => `  "${s}": secondary on ${r[0]}, primary on ${kw.get(s)!.join(", ")}`));
console.log(`Secondary/primary overlaps: ${overlaps.length}`);
overlaps.forEach((o) => console.log(o));
