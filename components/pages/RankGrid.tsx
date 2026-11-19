"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

// Example 7×7 map-pack grid: rank of the business at each point around its location.
const BEFORE = [
  [20, 18, 15, 14, 16, 19, 20], [17, 13, 11, 9, 12, 15, 19], [15, 10, 7, 6, 8, 12, 16], [14, 9, 6, 4, 6, 10, 15],
  [16, 11, 8, 6, 9, 13, 17], [19, 14, 12, 10, 13, 16, 20], [20, 19, 17, 15, 18, 20, 20],
];
const AFTER = [
  [9, 6, 4, 3, 4, 6, 9], [6, 3, 2, 2, 2, 4, 7], [4, 2, 1, 1, 1, 2, 5], [3, 2, 1, 1, 1, 2, 4],
  [4, 2, 1, 1, 2, 3, 5], [7, 4, 2, 2, 3, 5, 8], [10, 7, 5, 4, 5, 8, 11],
];
const tone = (r: number) => (r <= 3 ? "#2FB44B" : r <= 7 ? "#A2F27F" : r <= 12 ? "#FFD84D" : r <= 19 ? "#FF9F6B" : "#FF6B5B");

/** Interactive local rank grid with a before / after toggle (illustrative data). */
export function RankGrid({ business, query }: { business: string; query: string }) {
  const [after, setAfter] = useState(false);
  const [hover, setHover] = useState<[number, number] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const grid = after ? AFTER : BEFORE;
  const flat = grid.flat();
  const top3 = flat.filter((r) => r <= 3).length;
  const avg = (flat.reduce((s, r) => s + r, 0) / flat.length).toFixed(1);

  // Flip to "after" once when it scrolls into view, so the change is visible.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setAfter(true), 900); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="rgrid" ref={ref}>
      <div className="rgrid-top">
        <div>
          <span className="label">Local rank grid · example</span>
          <b>&ldquo;{query}&rdquo;</b>
        </div>
        <div className="rgrid-toggle" role="group" aria-label="Show ranking">
          <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>Before</button>
          <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>After 6 months</button>
        </div>
      </div>
      <div className="rgrid-map" aria-label={`Example grid: ${top3} of 49 points in the top 3, average rank ${avg}`}>
        <div className="rgrid-cells">
          {grid.map((row, y) => row.map((r, x) => (
            <button
              type="button"
              key={`${x}-${y}`}
              className="rcell"
              style={{ background: tone(r), transitionDelay: `${(Math.abs(3 - x) + Math.abs(3 - y)) * 45}ms` }}
              onMouseEnter={() => setHover([x, y])}
              onFocus={() => setHover([x, y])}
              onMouseLeave={() => setHover(null)}
              aria-label={`Point ${x + 1},${y + 1}: rank ${r >= 20 ? "20+" : r}`}
            >
              {r >= 20 ? "20+" : r}
            </button>
          )))}
        </div>
        <span className="rgrid-pin" aria-hidden="true">📍</span>
      </div>
      <div className="rgrid-stats">
        <div><b>{top3}/49</b><span>points in the top 3</span></div>
        <div><b>{avg}</b><span>average map rank</span></div>
        <div><b>{hover ? `#${grid[hover[1]][hover[0]] >= 20 ? "20+" : grid[hover[1]][hover[0]]}` : "Hover"}</b><span>{hover ? "rank at this point" : "a point to inspect"}</span></div>
      </div>
      <p className="rgrid-note">Illustrative example of how we track {business} in the map pack across your service area. Your audit shows your real grid.</p>
    </div>
  );
}
