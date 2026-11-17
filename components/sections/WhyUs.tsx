"use client";

import { useRef } from "react";
import { promises } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { useRafLoop } from "@/hooks/useRafLoop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/utils";

function Art({ type }: { type: (typeof promises)[number]["art"] }) {
  switch (type) {
    case "check":
      return (
        <svg viewBox="0 0 200 150">
          <circle className="spin" cx="100" cy="75" r="56" fill="none" stroke="#111" strokeWidth="2" strokeDasharray="6 8" />
          <circle className="float" cx="100" cy="75" r="30" fill="#111" />
          <path d="M88 75l8 8 16-16" stroke="#A2F27F" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "report":
      return (
        <svg viewBox="0 0 200 150">
          <rect x="50" y="20" width="100" height="112" rx="10" fill="#fff" stroke="#111" strokeWidth="2" />
          <rect className="float" x="64" y="38" width="72" height="8" rx="4" fill="#111" />
          <rect x="64" y="56" width="52" height="6" rx="3" fill="#111" opacity=".4" />
          <rect x="64" y="96" width="12" height="22" rx="2" fill="#111" />
          <rect x="82" y="86" width="12" height="32" rx="2" fill="#111" />
          <rect x="100" y="74" width="12" height="44" rx="2" fill="#111" />
          <rect x="118" y="64" width="12" height="54" rx="2" fill="#A2F27F" stroke="#111" strokeWidth="2" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 200 150">
          <path className="float" d="M100 20 L146 38 V76 C146 104 126 122 100 132 C74 122 54 104 54 76 V38 Z" fill="#fff" stroke="#111" strokeWidth="2.5" />
          <path d="M84 76l11 11 22-22" stroke="#111" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "calendar":
      return (
        <svg viewBox="0 0 200 150">
          <rect x="45" y="30" width="110" height="96" rx="12" fill="#fff" stroke="#111" strokeWidth="2.5" />
          <rect x="45" y="30" width="110" height="24" rx="12" fill="#111" />
          <g fill="#111" opacity=".25">
            <rect x="58" y="66" width="14" height="12" rx="3" />
            <rect x="80" y="66" width="14" height="12" rx="3" />
            <rect x="102" y="66" width="14" height="12" rx="3" />
            <rect x="58" y="88" width="14" height="12" rx="3" />
            <rect x="80" y="88" width="14" height="12" rx="3" />
          </g>
          <circle className="float" cx="134" cy="100" r="14" fill="#A99BFB" stroke="#111" strokeWidth="2" />
        </svg>
      );
  }
}

/** Four promise cards that stick and stack; the ones underneath shrink slightly. */
export function WhyUs() {
  const reduced = useReducedMotion();
  const cards = useRef<Array<HTMLElement | null>>([]);

  useRafLoop(() => {
    cards.current.forEach((c, i) => {
      const next = cards.current[i + 1];
      if (!c) return;
      if (!next) { c.style.setProperty("--s", "1"); return; }
      const overlap = clamp(1 - (next.getBoundingClientRect().top - c.getBoundingClientRect().top) / c.offsetHeight, 0, 1);
      c.style.setProperty("--s", (1 - overlap * 0.06).toFixed(4));
    });
  }, !reduced);

  return (
    <section className="block" id="why" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={["Why businesses pick us."]} />
          <Reveal as="p">Four promises we put in every contract. Scroll through them.</Reveal>
        </div>
        <div className="stack">
          {promises.map((p, i) => (
            <article
              key={p.tag}
              className="scard"
              ref={(el) => { cards.current[i] = el; }}
              style={{ ["--i" as string]: i, background: p.color }}
            >
              <div>
                <span className="label">{p.tag}</span>
                <h3>{p.title}</h3>
                <p>{p.copy}</p>
              </div>
              <div className="art" aria-hidden="true"><Art type={p.art} /></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
