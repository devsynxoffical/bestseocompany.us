"use client";

import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { useRafLoop } from "@/hooks/useRafLoop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/utils";

type Mock = (typeof caseStudies)[number]["mock"];

function CaseMock({ type }: { type: Mock }) {
  if (type === "dashboard") {
    return (
      <div className="cmedia" style={{ background: "linear-gradient(160deg,#BFD8F2,#6C8FE0 55%,#2B3EA8)" }}>
        <div className="m-dash" aria-hidden="true">
          <div className="mt">Organic overview <span style={{ fontWeight: 400, color: "#8A8FA8", fontSize: 11 }}>· last 12 months</span></div>
          <div className="mk">
            <div><small>ORGANIC LEADS</small><b>1,284</b> <i>▲ 318%</i></div>
            <div><small>CALLS</small><b>3,912</b> <i>▲ 204%</i></div>
          </div>
          <svg viewBox="0 0 300 120" preserveAspectRatio="none">
            <path d="M0 104 L30 100 L60 96 L90 90 L120 80 L150 72 L180 58 L210 46 L240 34 L270 22 L300 14 L300 120 L0 120Z" fill="#6C7BFF" fillOpacity=".22" />
            <path d="M0 104 L30 100 L60 96 L90 90 L120 80 L150 72 L180 58 L210 46 L240 34 L270 22 L300 14" fill="none" stroke="#8C98FF" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
    );
  }
  if (type === "shop") {
    return (
      <div className="cmedia" style={{ background: "linear-gradient(180deg,#FFF59A,#F7D84A)" }}>
        <div className="m-phone" style={{ top: "10%" }} aria-hidden="true">
          <div className="scr">
            <div className="notch" />
            <div className="srch">⌕ waterproof hiking boots</div>
            <div className="promo"><b>Shop result #1</b>Organic, no ad spend</div>
            <div className="res you"><span>trailstore.com</span><b>Waterproof Hiking Boots (2026)</b></div>
            <div className="res"><span>bigbox.com</span><b>Men&apos;s Boots | Big Box</b></div>
            <div className="res"><span>reviews-site.com</span><b>10 Best Hiking Boots</b></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="cmedia" style={{ background: "radial-gradient(120% 90% at 30% 20%,#3DF2A8,#0F9A5A 55%,#065B34)" }}>
      <div className="m-phone" style={{ left: "10%", top: "12%", transform: "rotate(-12deg)" }} aria-hidden="true">
        <div className="scr">
          <div className="notch" />
          <div className="srch">⌕ dentist near me</div>
          <div className="mapx"><i style={{ left: "30%", top: "30%" }} /><i style={{ left: "62%", top: "52%", background: "#888" }} /></div>
          <div className="res you"><b>Bright Dental · ★ 4.9</b><span>0.4 mi · Open now</span></div>
          <div className="res"><b>Lakeside Dental · ★ 4.6</b></div>
        </div>
      </div>
      <div className="m-phone" style={{ right: "8%", top: "24%", transform: "rotate(10deg)" }} aria-hidden="true">
        <div className="scr">
          <div className="notch" />
          <div className="res you" style={{ padding: "12px 8px" }}><b style={{ fontSize: 14 }}>+187% calls</b><span>from Google Maps</span></div>
          <div className="res"><b>Reviews this month</b><span>★★★★★ 64 new</span></div>
          <div className="res"><b>Directions requests</b><span>▲ 2.3×</span></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Case studies pinned in place while each new card slides up over the last.
 * Two crossing ribbons behind the stack change colour and words per card.
 * Without JS or with reduced motion it falls back to a plain list.
 */
export function CaseStack() {
  const reduced = useReducedMotion();
  const [live, setLive] = useState(false);
  const [active, setActive] = useState(0);
  const stack = useRef<HTMLDivElement>(null);
  const cards = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => setLive(!reduced), [reduced]);

  useRafLoop(() => {
    const el = stack.current;
    if (!el) return;
    const vh = window.innerHeight;
    const r = el.getBoundingClientRect();
    const total = el.offsetHeight - vh;
    const n = caseStudies.length;
    const p = clamp(-r.top / Math.max(1, total), 0, 1) * (n - 1);
    cards.current.forEach((c, i) => {
      if (!c) return;
      if (i > p) {
        const o = Math.min(1, i - p);
        c.style.transform = `translateY(${o * vh}px) rotate(${o * 6}deg)`;
        c.style.filter = "";
      } else {
        const d = p - i;
        c.style.transform = `translateY(${-d * 34}px) scale(${1 - d * 0.06}) rotate(${(i % 2 ? 1 : -1) * Math.min(d, 1) * 1.6}deg)`;
        c.style.filter = `brightness(${1 - Math.min(d, 1) * 0.06})`;
      }
      c.style.zIndex = String(i);
    });
    const idx = Math.min(n - 1, Math.round(p));
    setActive((a) => (a === idx ? a : idx));
  }, live);

  const current = caseStudies[active];
  const ribbon = (a: string, b: string) =>
    Array.from({ length: 8 }, (_, k) => <span key={k}>{k % 2 ? b : a}</span>);

  return (
    <section className="block cstack-sec" id="results">
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={["Results our clients can bank."]} />
          <Reveal style={{ display: "grid", gap: 14, justifyItems: "start" }}>
            <p>Each project gets a clear goal on day one. Keep scrolling to flip through three of them.</p>
            <span className="placeholder-note">Sample case studies, replace with your own</span>
          </Reveal>
        </div>
      </div>

      <div
        ref={stack}
        className={`cstack${live ? " live" : ""}`}
        style={{ ["--n" as string]: caseStudies.length, ["--rib" as string]: current.ribbon, ["--ribtxt" as string]: current.ribbonText }}
      >
        <div className="cs-sticky">
          <div className="ribbon r1" aria-hidden="true"><div className="rtrack">{ribbon(current.words[0], current.words[1])}</div></div>
          <div className="ribbon r2" aria-hidden="true"><div className="rtrack">{ribbon(current.words[1], current.words[0])}</div></div>
          <div className="cs-cards">
            {caseStudies.map((c, i) => (
              <article key={c.title} className="ccard" ref={(el) => { cards.current[i] = el; }}>
                <CaseMock type={c.mock} />
                <div className="ctext">
                  <h3>{c.title}</h3>
                  <p>{c.copy}</p>
                  <div className="cpills">{c.pills.map((p) => <span key={p}>{p}</span>)}</div>
                  <a className="cgo" href="#audit" aria-label="Get a plan like this">↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
