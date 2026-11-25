/**
 * Location page checks (City Plan rules): word count and uniqueness vs sibling pages.
 * Uniqueness = share of a page's 5-word phrases (shingles) that appear on no sibling page.
 * Run against a running server: BASE=http://localhost:3000 node scripts/location-uniq.mjs
 */
const BASE = process.env.BASE || "http://localhost:3000";
const MIN_WORDS = Number(process.env.MIN_WORDS || 800), MIN_UNIQUE = 0.6;
const sm = await (await fetch(`${BASE}/sitemap-locations.xml`)).text();
const paths = [...sm.matchAll(/<loc>[^<]*?(\/locations\/[^<]+)<\/loc>/g)].map((m) => m[1]);
const text = (h) => (h.match(/<main[\s\S]*<\/main>/) || [""])[0].replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").toLowerCase().replace(/[^a-z0-9$%,.' ]+/g, " ").split(/\s+/).filter(Boolean);
const pages = {};
for (const p of paths) pages[p] = text(await (await fetch(BASE + p)).text());
const sh = (w) => { const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(" ")); return s; };
const S = Object.fromEntries(Object.entries(pages).map(([p, w]) => [p, sh(w)]));
let fail = 0;
for (const p of paths) {
  const others = new Set(paths.filter((x) => x !== p).flatMap((x) => [...S[x]]));
  const mine = [...S[p]];
  const uniq = mine.length ? mine.filter((x) => !others.has(x)).length / mine.length : 1;
  const ok = pages[p].length >= MIN_WORDS && uniq >= MIN_UNIQUE;
  if (!ok) fail++;
  console.log(`${ok ? "OK  " : "FAIL"} ${p}  words=${pages[p].length}  unique=${(uniq * 100).toFixed(1)}%`);
}
if (paths.length < 2) console.log("(only one location page: uniqueness not comparable yet)");
process.exit(fail ? 1 : 0);
