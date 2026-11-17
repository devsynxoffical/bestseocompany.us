"use client";

import { useRef } from "react";
import { dashboard } from "@/lib/content";
import { CountUp } from "@/components/ui/CountUp";
import { useRafLoop } from "@/hooks/useRafLoop";
import { useReveal } from "@/hooks/useReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/utils";

/** Dark reporting dashboard that grows to full size as it scrolls in; bars rise when visible. */
export function DashboardReel() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const bars = useReveal<HTMLDivElement>({ threshold: 0.2, rootMargin: "0px" });

  useRafLoop(() => {
    const s = section.current, b = box.current;
    if (!s || !b) return;
    const r = s.getBoundingClientRect();
    b.style.setProperty("--p", clamp((window.innerHeight - r.top) / (window.innerHeight * 0.8), 0, 1).toFixed(3));
  }, !reduced);

  return (
    <section className="reel" ref={section}>
      <div className="wrap">
        <div className="reel-box" ref={box}>
          <div className="reel-top">
            <h2>Your growth, <em>reported</em> every month.</h2>
            <span className="label" style={{ color: "#9C9A93" }}>Example client dashboard</span>
          </div>
          <div className="kpis">
            {dashboard.kpis.map((k) => (
              <div className="kpi" key={k.label}>
                <span>{k.label}</span>
                <b><CountUp to={k.value} separator={k.separator} decimals={k.decimals} /></b>
                <small>{k.delta}</small>
              </div>
            ))}
          </div>
          <div>
            <div className="bars bars-grow" ref={bars} aria-hidden="true">
              {dashboard.bars.map((h, k) => (
                <i key={k} style={{ ["--h" as string]: `${h}%`, ["--k" as string]: k }} />
              ))}
            </div>
            <div className="bars-x" aria-hidden="true"><span>JAN</span><span>APR</span><span>JUL</span><span>OCT</span><span>DEC</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
