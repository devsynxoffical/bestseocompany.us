"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { cx } from "@/lib/utils";

type Item = { slug: string; name: string; blurb: string; color: string; category: string; keywords: string };

/** Searchable, filterable grid of industry pages. */
export function IndustryDirectory({ items, categories }: { items: Item[]; categories: string[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((i) => (cat === "All" || i.category === cat) && (!needle || `${i.name} ${i.keywords}`.toLowerCase().includes(needle)));
  }, [items, q, cat]);

  return (
    <div className="dir">
      <div className="dir-tools">
        <label htmlFor="dir-q" className="sr">Search industries</label>
        <input id="dir-q" type="search" placeholder="Search your industry, e.g. roofing, dental, law…" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="dir-cats" role="group" aria-label="Filter by category">
          {["All", ...categories].map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} className={cx(cat === c && "on")} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </div>
      <p className="dir-count" role="status">{shown.length} {shown.length === 1 ? "industry" : "industries"}</p>
      <div className="dir-grid">
        {shown.map((i, k) => (
          <Link key={i.slug} href={`/industries/${i.slug}`} className="dir-card" style={{ ["--tc" as string]: `var(--${i.color})`, animationDelay: `${Math.min(k, 12) * 30}ms` }} data-cursor="Open">
            <span className="dir-cat">{i.category}</span>
            <b>{i.name} SEO</b>
            <span className="dir-blurb">{i.blurb}</span>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
        {!shown.length && <p className="dir-empty">No match yet. <Link href="/#audit">Tell us your industry</Link> and we'll show you how we'd approach it.</p>}
      </div>
    </div>
  );
}
