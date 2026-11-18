/**
 * Exports docs/keyword-map.csv: one row per indexable content page with its
 * target keyword, title and meta description lengths.
 * Run: npm run seo:export
 */
import { writeFileSync } from "node:fs";
import { industriesA } from "../lib/pages/industries-a.ts";
import { industriesB } from "../lib/pages/industries-b.ts";
import { industriesC } from "../lib/pages/industries-c.ts";
import { services } from "../lib/pages/services.ts";
import { tools } from "../lib/pages/tools.ts";
import { guides1 } from "../lib/pages/guides-1.ts";
import { guides2 } from "../lib/pages/guides-2.ts";
import { guides3 } from "../lib/pages/guides-3.ts";
import { blogPosts } from "../lib/pages/blog.ts";

const SITE = "https://bestseocompany.us";
type Row = [string, string, string, string, string, number, number, string];
const rows: Row[] = [];
for (const p of [...industriesA, ...industriesB, ...industriesC]) rows.push([`${SITE}/industries/${p.slug}`, "Industry", p.primaryKeyword, p.secondaryKeywords.join("; "), p.title, p.title.length, p.metaDescription.length, p.h1]);
for (const p of services) rows.push([`${SITE}/services/${p.slug}`, "Service", p.primaryKeyword, p.secondaryKeywords.join("; "), p.title, p.title.length, p.metaDescription.length, p.h1]);
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
