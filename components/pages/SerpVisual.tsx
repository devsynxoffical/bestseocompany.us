"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Mock search results page that types each customer query in turn and shows
 * "your business" climbing to the top spot.
 */
export function SerpVisual({ searches, business }: { searches: { query: string; intent: string }[]; business: string }) {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(searches[0]?.query ?? "");
  const [rank, setRank] = useState(1);

  useEffect(() => {
    if (prefersReducedMotion() || !searches.length) return;
    let n = 0, t: number;
    const q = searches[i].query;
    setTyped("");
    setRank(3);
    const type = () => {
      n++;
      setTyped(q.slice(0, n));
      if (n < q.length) t = window.setTimeout(type, 38);
      else {
        t = window.setTimeout(() => setRank(2), 450);
        window.setTimeout(() => setRank(1), 900);
        window.setTimeout(() => setI((x) => (x + 1) % searches.length), 3400);
      }
    };
    t = window.setTimeout(type, 300);
    return () => clearTimeout(t);
  }, [i, searches]);

  const others = ["A directory listing", "A national chain", "A lead-gen marketplace"];
  const rows = [0, 1, 2].map((pos) => (pos + 1 === rank ? "you" : others[pos]));

  return (
    <div className="serp" aria-hidden="true">
      <div className="serp-bar">
        <svg width="16" height="16" viewBox="0 0 24 24"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="2.5" /><path d="M15 15l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>
        <span className="serp-q">{typed}<i className="serp-caret" /></span>
        <span className="serp-intent">{searches[i]?.intent}</span>
      </div>
      <div className="serp-results">
        {rows.map((r, k) =>
          r === "you" ? (
            <div className="serp-row you" key="you" style={{ order: k }}>
              <span className="serp-pos">#{k + 1}</span>
              <div><small>yourwebsite.com</small><b>{business}</b><span>Top-rated · Open now · Free quote</span></div>
            </div>
          ) : (
            <div className="serp-row" key={r} style={{ order: k }}>
              <span className="serp-pos">#{k + 1}</span>
              <div><small>example.com</small><b>{r}</b><span>Generic listing</span></div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
