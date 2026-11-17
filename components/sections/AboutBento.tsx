"use client";

import { useEffect, useRef, useState } from "react";
import { bentoSteps, leadSources } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { Globe } from "@/components/ui/Globe";
import { useReveal } from "@/hooks/useReveal";
import { hasFinePointer, useReducedMotion } from "@/hooks/useReducedMotion";

/** Gold laurel branch built from leaves placed along an arc. */
function Laurel({ flip }: { flip?: boolean }) {
  const leaves = Array.from({ length: 8 }, (_, k) => {
    const deg = 236 - k * 16;
    const a = (deg * Math.PI) / 180;
    return { k, deg, x: 70 + 56 * Math.cos(a), y: 65 + 56 * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 74 130" className={flip ? "lf rt" : "lf"} aria-hidden="true">
      <path d="M42 113 A56 56 0 0 1 42 17" fill="none" stroke="#C98F07" strokeWidth="2.5" />
      {leaves.map(({ k, deg, x, y }) => (
        <g key={k} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${deg + 125})`}>
          <ellipse className="leaf" cx="0" cy="-9" rx="5.5" ry="11" fill={k % 2 ? "#E2A50B" : "#F2C230"} style={{ ["--k" as string]: 7 - k }} />
        </g>
      ))}
    </svg>
  );
}

/** Steps that tick themselves off in a loop. */
function Stepper() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(bentoSteps.length - 1);
  useEffect(() => {
    if (reduced) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => (s + 1) % bentoSteps.length), 1500);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div className="stepper" style={{ ["--sw" as string]: `${(step / (bentoSteps.length - 1)) * 100}%` }}>
      <div className="ln"><i /></div>
      {bentoSteps.map((name, i) => (
        <div key={name} className={`stp${i <= step ? " done" : ""}${i === step ? " cur" : ""}`}>
          <span className="dot" aria-hidden="true">{i <= step ? "✓" : ""}</span>
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * About grid: each tile tilts toward the mouse with a moving glare, the principle
 * card floats in 3D, the globe spins and can be dragged.
 */
export function AboutBento() {
  const reduced = useReducedMotion();
  const bento = useRef<HTMLDivElement>(null);
  const globeTile = useRef<HTMLDivElement>(null);
  const fcard = useRef<HTMLDivElement>(null);
  const laurel = useReveal<HTMLDivElement>({ threshold: 0.3, rootMargin: "0px" });
  const bars = useReveal<HTMLDivElement>({ threshold: 0.3, rootMargin: "0px" });

  useEffect(() => {
    const root = bento.current;
    if (!root || reduced || !hasFinePointer()) return;
    const cleanups: Array<() => void> = [];

    root.querySelectorAll<HTMLElement>(".tile").forEach((t) => {
      const move = (e: MouseEvent) => {
        const r = t.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        t.style.setProperty("--ty", `${(x - 0.5) * 10}deg`);
        t.style.setProperty("--tx", `${-(y - 0.5) * 10}deg`);
        t.style.setProperty("--gx", `${x * 100}%`);
        t.style.setProperty("--gy", `${y * 100}%`);
      };
      const leave = () => { t.style.setProperty("--tx", "0deg"); t.style.setProperty("--ty", "0deg"); };
      t.addEventListener("mousemove", move);
      t.addEventListener("mouseleave", leave);
      cleanups.push(() => { t.removeEventListener("mousemove", move); t.removeEventListener("mouseleave", leave); });
    });

    const fc = fcard.current;
    const moveCard = (e: MouseEvent) => {
      if (!fc) return;
      const r = root.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      fc.style.setProperty("--fx", `${x * 34}px`);
      fc.style.setProperty("--fy", `${y * 26}px`);
      fc.style.setProperty("--fr", `${-2 + x * 6}deg`);
    };
    const resetCard = () => {
      fc?.style.setProperty("--fx", "0px");
      fc?.style.setProperty("--fy", "0px");
      fc?.style.setProperty("--fr", "-2deg");
    };
    root.addEventListener("mousemove", moveCard);
    root.addEventListener("mouseleave", resetCard);
    cleanups.push(() => { root.removeEventListener("mousemove", moveCard); root.removeEventListener("mouseleave", resetCard); });

    return () => cleanups.forEach((fn) => fn());
  }, [reduced]);

  return (
    <section className="block" id="about" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={["A team built for search."]} />
          <Reveal as="p">Move your mouse over the tiles. Drag the globe to spin it.</Reveal>
        </div>

        <Reveal className="bento">
          <div ref={bento} style={{ display: "contents" }}>
            <div className="tile t-globe" ref={globeTile} data-cursor="Drag">
              <Globe dragTarget={globeTile} />
              <span className="live"><i /> Live client map</span>
              <div className="cap">
                <b>Clients in 38 states</b>
                <span>New York · Austin · Miami · Denver · LA</span>
              </div>
            </div>

            <div className="tile t-craft">
              <h3>SEO craft</h3>
              <div className="icons3" aria-hidden="true">
                <div>
                  <svg viewBox="0 0 56 46">
                    <rect x="4" y="4" width="48" height="38" rx="6" fill="#E3DDFF" />
                    <rect className="scanl" x="4" y="8" width="48" height="4" fill="#A99BFB" />
                    <rect x="12" y="20" width="32" height="4" rx="2" fill="#A99BFB" opacity=".6" />
                    <rect x="12" y="28" width="22" height="4" rx="2" fill="#A99BFB" opacity=".6" />
                  </svg>
                  <span>Crawl</span>
                </div>
                <div>
                  <svg viewBox="0 0 56 46">
                    <rect className="typel" x="6" y="8" width="44" height="6" rx="3" fill="#F2B705" />
                    <rect className="typel" x="6" y="20" width="34" height="6" rx="3" fill="#F2B705" opacity=".7" />
                    <rect className="typel" x="6" y="32" width="40" height="6" rx="3" fill="#F2B705" opacity=".5" />
                  </svg>
                  <span>Content</span>
                </div>
                <div>
                  <svg viewBox="0 0 56 46">
                    <line x1="12" y1="34" x2="28" y2="12" stroke="#9AA5C9" strokeWidth="2" />
                    <line x1="28" y1="12" x2="44" y2="34" stroke="#9AA5C9" strokeWidth="2" />
                    <line x1="12" y1="34" x2="44" y2="34" stroke="#9AA5C9" strokeWidth="2" />
                    <circle className="nodep" cx="28" cy="12" r="6" fill="#6C7BFF" />
                    <circle className="nodep" cx="12" cy="34" r="6" fill="#6C7BFF" />
                    <circle className="nodep" cx="44" cy="34" r="6" fill="#6C7BFF" />
                  </svg>
                  <span>Links</span>
                </div>
              </div>
            </div>

            <div className="tile t-float">
              <div className="fcard" ref={fcard}>
                <svg className="ptr" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 3l16 7-7 2-2 7z" fill="none" stroke="#111" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
                <h3>Our principle</h3>
                <p>We don&apos;t chase rankings to impress you. We chase the searches that pay your bills.</p>
              </div>
            </div>

            <div className="tile t-exp">
              <span className="label">Experience</span>
              <div className="laurel" ref={laurel} aria-label="12 plus years">
                <Laurel />
                <div className="yrs"><b>12<em>+</em></b><span>Years</span></div>
                <Laurel flip />
              </div>
              <div>
                <h3>Growing US businesses</h3>
                <p>Ranking local service companies, online stores and SaaS brands since 2014.</p>
              </div>
            </div>

            <div className="tile t-collab">
              <span className="label">Collaboration</span>
              <div className="txt">
                <h3>Works with your team</h3>
                <p>We plug into your developers, writers and sales team, in the tools you already use.</p>
                <span className="ncur c1" aria-hidden="true"><svg viewBox="0 0 18 18"><path d="M1 1l16 6-7 2-2 7z" /></svg><b>Your dev</b></span>
                <span className="ncur c2" aria-hidden="true"><svg viewBox="0 0 18 18"><path d="M1 1l16 6-7 2-2 7z" /></svg><b>Our strategist</b></span>
              </div>
            </div>

            <div className="tile t-ship">
              <div>
                <h3>Pages ranked</h3>
                <p>On page one of Google for our clients.</p>
              </div>
              <div className="num"><CountUp to={4800} separator /><em>+</em></div>
            </div>

            <div className="tile t-lang">
              <span className="label">Where client leads come from</span>
              <div className="lbars" ref={bars}>
                {leadSources.map((s) => (
                  <div key={s.label}>
                    <small>{s.label} <b>{s.value}%</b></small>
                    <div className="tr"><i style={{ ["--v" as string]: `${s.value}%` }} /></div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13, marginTop: 14 }}>Example split across client accounts.</p>
            </div>

            <div className="tile t-proc">
              <span className="label">Every project, same path</span>
              <Stepper />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
