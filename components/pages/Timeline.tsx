"use client";

import { useState } from "react";
import { cx } from "@/lib/utils";

const PHASES = [
  { tab: "Month 1", title: "Audit and foundations", items: ["Full technical and local audit", "Fix indexing, speed and schema issues", "Google Business Profile categories, services and photos", "Keyword-to-page map agreed with you"], outcome: "A site Google can crawl and understand." },
  { tab: "Months 2–3", title: "Pages that match searches", items: ["New or rewritten service and location pages", "FAQ and answer-first content for AI search", "Review request process in place", "Internal links to your money pages"], outcome: "More pages eligible to rank for buying searches." },
  { tab: "Months 4–6", title: "Authority and expansion", items: ["Digital PR and local link building", "Citations cleaned up and expanded", "Content for the next tier of keywords", "Conversion tweaks on pages with traffic"], outcome: "Rankings climb and more visits turn into calls." },
  { tab: "Month 6+", title: "Compounding growth", items: ["Monthly reporting on leads and revenue", "Refresh pages that slip", "New services or locations as you grow", "Quarterly strategy review"], outcome: "Steady, compounding organic leads." },
];

/** Tabbed "what happens month by month" timeline. */
export function Timeline() {
  const [i, setI] = useState(0);
  const p = PHASES[i];
  return (
    <div className="tline">
      <div className="tline-tabs" role="tablist" aria-label="SEO timeline">
        {PHASES.map((ph, k) => (
          <button key={ph.tab} type="button" role="tab" aria-selected={k === i} className={cx(k === i && "on", k < i && "done")} onClick={() => setI(k)}>
            <span className="tline-dot" aria-hidden="true">{k < i ? "✓" : k + 1}</span>{ph.tab}
          </button>
        ))}
        <span className="tline-bar" aria-hidden="true"><i style={{ transform: `scaleX(${(i + 1) / PHASES.length})` }} /></span>
      </div>
      <div className="tline-panel" role="tabpanel" key={i}>
        <h3>{p.title}</h3>
        <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
        <p className="tline-out"><b>Outcome:</b> {p.outcome}</p>
        <div className="tline-nav">
          <button type="button" className="btn ghost" disabled={i === 0} onClick={() => setI(i - 1)}>← Back</button>
          <button type="button" className="btn" disabled={i === PHASES.length - 1} onClick={() => setI(i + 1)}>Next phase →</button>
        </div>
      </div>
    </div>
  );
}
