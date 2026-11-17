"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { plans, yearlyDiscount } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { easeOutCubic } from "@/lib/utils";

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

/** Animated price that tweens between values. */
function Price({ value }: { value: number }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = performance.now(), a = from.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(value); from.current = value; return; }
    let id = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 600);
      const v = a + (value - a) * easeOutCubic(p);
      setShown(v);
      from.current = v;
      if (p < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [value]);
  return <span>{money(shown)}</span>;
}

/** Three plans with a sliding Monthly / Yearly toggle. */
export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const monthlyBtn = useRef<HTMLButtonElement>(null);
  const yearlyBtn = useRef<HTMLButtonElement>(null);
  const [knob, setKnob] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const place = () => {
      const b = yearly ? yearlyBtn.current : monthlyBtn.current;
      if (b) setKnob({ left: b.offsetLeft - 5, width: b.offsetWidth });
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [yearly]);

  return (
    <section className="block" id="pricing" style={{ paddingTop: 24 }}>
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={["Simple monthly plans."]} />
          <Reveal style={{ display: "grid", gap: 16, justifyItems: "start" }}>
            <p>Month-to-month after the first 90 days. Cancel with 30 days&apos; notice.</p>
            <div className="toggle" role="group" aria-label="Billing period">
              <span className="knob" style={{ width: knob.width, transform: `translateX(${knob.left}px)` }} />
              <button type="button" ref={monthlyBtn} aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button>
              <button type="button" ref={yearlyBtn} aria-pressed={yearly} onClick={() => setYearly(true)}>
                Yearly<span className="save">−{Math.round(yearlyDiscount * 100)}%</span>
              </button>
            </div>
          </Reveal>
        </div>

        <div className="plans">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={(i || undefined) as 1 | 2 | undefined} className={`plan${p.featured ? " feat" : ""}`}>
              {p.featured && <span className="flag">Most picked</span>}
              <span className="label">{p.tier}</span>
              <h3>{p.name}</h3>
              <div className="price">
                {p.monthly === null ? "Custom" : (
                  <>
                    <Price value={p.monthly * (yearly ? 1 - yearlyDiscount : 1)} />
                    <small> / month</small>
                  </>
                )}
              </div>
              <p>{p.blurb}</p>
              <ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              {p.featured ? (
                <MagneticLink href="#audit" arrow>{p.cta}</MagneticLink>
              ) : (
                <a className="btn ghost" href="#audit">{p.cta}</a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
