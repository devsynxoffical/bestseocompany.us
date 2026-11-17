"use client";

import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { useRafLoop } from "@/hooks/useRafLoop";
import { hasFinePointer, useReducedMotion } from "@/hooks/useReducedMotion";

type FloaterProps = {
  /** Scroll speed (negative moves the other way). */
  speed: number;
  /** Mouse parallax depth in px. */
  depth: number;
  /** Base rotation in degrees. */
  rotate: number;
  layer?: "near" | "far";
  hideOnPhone?: boolean;
  phoneSlot?: "m-top1" | "m-top2" | "m-low1" | "m-low2" | "m-low3";
  pos: CSSProperties;
  bob?: { duration: string; delay?: string };
  children: ReactNode;
};

function Floater({ speed, depth, rotate, layer, hideOnPhone, phoneSlot, pos, bob, children }: FloaterProps) {
  return (
    <div
      className={["fl", layer, hideOnPhone && "hide-sm", phoneSlot].filter(Boolean).join(" ")}
      data-s={speed}
      data-d={depth}
      data-r={rotate}
      style={pos}
      aria-hidden="true"
    >
      <div className="bob" style={{ ["--bd" as string]: bob?.duration ?? "6s", ["--bdl" as string]: bob?.delay ?? "0s" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * Big centred message surrounded by 3D SEO objects. Every object drifts at its own
 * speed while scrolling, tilts toward the mouse and bobs gently on its own.
 */
export function FloatingSeo() {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (!hasFinePointer() || !section.current) return;
    const r = section.current.getBoundingClientRect();
    mouse.current.x = (e.clientX - r.left) / r.width - 0.5;
    mouse.current.y = (e.clientY - r.top) / r.height - 0.5;
  };
  const onLeave = () => {
    mouse.current.x = 0;
    mouse.current.y = 0;
  };

  useRafLoop(() => {
    const sec = section.current;
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.bottom < -200 || r.top > vh + 200) return;
    const m = mouse.current;
    m.tx += (m.x - m.tx) * 0.08;
    m.ty += (m.y - m.ty) * 0.08;
    const p = (vh - r.top) / (vh + r.height) - 0.5;
    const scale = window.innerWidth < 760 ? 0.25 : 1;
    sec.querySelectorAll<HTMLElement>(".fl").forEach((el) => {
      const s = Number(el.dataset.s), d = Number(el.dataset.d), r0 = Number(el.dataset.r);
      const y = -p * s * 520 * scale + m.ty * d;
      const x = m.tx * d;
      el.style.transform =
        `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotateZ(${(r0 + p * s * 30).toFixed(2)}deg) ` +
        `rotateX(${(-m.ty * d * 0.6 + p * 18).toFixed(2)}deg) rotateY(${(m.tx * d * 0.8).toFixed(2)}deg)`;
    });
  }, !reduced);

  return (
    <section className="floatsec" id="why-search" ref={section} onMouseMove={onMove} onMouseLeave={onLeave} aria-labelledby="floatTitle">
      {/* Magnifying glass */}
      <Floater speed={0.55} depth={26} rotate={-14} phoneSlot="m-top1" pos={{ left: "5%", top: "9%" }} bob={{ duration: "7s" }}>
        <svg className="o-svg" width="170" height="170" viewBox="0 0 170 170">
          <defs>
            <radialGradient id="fs-lens" cx="35%" cy="30%">
              <stop offset="0" stopColor="#FFFFFF" />
              <stop offset=".55" stopColor="#E3DDFF" />
              <stop offset="1" stopColor="#A99BFB" />
            </radialGradient>
            <linearGradient id="fs-hdl" x1="0" x2="1">
              <stop offset="0" stopColor="#2A2A27" />
              <stop offset="1" stopColor="#111" />
            </linearGradient>
          </defs>
          <rect x="104" y="100" width="26" height="64" rx="13" transform="rotate(-45 117 132)" fill="url(#fs-hdl)" />
          <circle cx="70" cy="70" r="56" fill="#111" />
          <circle cx="70" cy="70" r="44" fill="url(#fs-lens)" />
          <path d="M46 52a30 30 0 0 1 22-14" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".9" />
          <text x="70" y="84" textAnchor="middle" style={{ fontFamily: "var(--font-display)" }} fontWeight="800" fontSize="34" fill="#111">SEO</text>
        </svg>
      </Floater>

      {/* #1 coin */}
      <Floater speed={-0.35} depth={40} rotate={12} layer="near" phoneSlot="m-top2" pos={{ right: "7%", top: "7%" }} bob={{ duration: "5.5s", delay: "-1s" }}>
        <div className="o-coin">#1</div>
      </Floater>

      {/* Traffic chip */}
      <Floater speed={0.9} depth={12} rotate={-6} layer="far" hideOnPhone pos={{ left: "34%", top: "3%" }} bob={{ duration: "8s" }}>
        <div className="o-chip" style={{ background: "var(--pink)" }}>+212% traffic</div>
      </Floater>

      {/* Map pin */}
      <Floater speed={-0.6} depth={18} rotate={8} hideOnPhone pos={{ left: "22%", top: "34%" }} bob={{ duration: "6.5s", delay: "-2s" }}>
        <svg className="o-svg" width="90" height="120" viewBox="0 0 90 120">
          <defs>
            <linearGradient id="fs-pin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FF7A6B" />
              <stop offset="1" stopColor="#C92617" />
            </linearGradient>
          </defs>
          <ellipse cx="45" cy="112" rx="18" ry="5" fill="#111" opacity=".18" />
          <path d="M45 4C23 4 7 20 7 41c0 29 38 66 38 66s38-37 38-66C83 20 67 4 45 4z" fill="url(#fs-pin)" stroke="#111" strokeWidth="2" />
          <circle cx="45" cy="41" r="14" fill="#fff" stroke="#111" strokeWidth="2" />
          <path d="M28 22a24 24 0 0 1 12-9" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".6" />
        </svg>
      </Floater>

      {/* Customer cursor */}
      <Floater speed={0.3} depth={30} rotate={0} hideOnPhone pos={{ left: "71%", top: "33%" }} bob={{ duration: "4.5s" }}>
        <div className="o-cursor">
          <svg width="26" height="26" viewBox="0 0 24 24"><path d="M3 2l18 8-8 2.5L10.5 21z" fill="#111" /></svg>
          <b>Your customer</b>
        </div>
      </Floater>

      {/* Reviews card */}
      <Floater speed={0.75} depth={34} rotate={-8} layer="near" phoneSlot="m-low1" pos={{ left: "3%", top: "64%" }} bob={{ duration: "6s", delay: "-3s" }}>
        <div className="o-card">
          <div className="o-stars">★★★★★</div>
          <b style={{ fontFamily: "var(--font-display)", fontSize: 26, letterSpacing: "-.04em" }}>4.9</b>{" "}
          <span style={{ color: "var(--ink-2)" }}>612 Google reviews</span>
        </div>
      </Floater>

      {/* Leads chart */}
      <Floater speed={0.55} depth={22} rotate={9} phoneSlot="m-low2" pos={{ right: "4%", top: "58%" }} bob={{ duration: "7.5s", delay: "-1.5s" }}>
        <div className="o-card" style={{ width: 190 }}>
          <span className="label" style={{ fontSize: 11, color: "var(--ink-2)" }}>Organic leads</span>
          <div className="o-bars">
            {[30, 45, 60, 78, 100].map((h, i) => (
              <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </Floater>

      {/* Backlink chain */}
      <Floater speed={-0.45} depth={14} rotate={-20} layer="far" hideOnPhone pos={{ right: "27%", top: "86%" }} bob={{ duration: "9s" }}>
        <svg className="o-svg" width="120" height="70" viewBox="0 0 120 70">
          <rect x="6" y="14" width="62" height="38" rx="19" fill="none" stroke="#111" strokeWidth="10" />
          <rect x="52" y="18" width="62" height="38" rx="19" fill="none" stroke="#A99BFB" strokeWidth="10" />
          <rect x="52" y="18" width="62" height="38" rx="19" fill="none" stroke="#111" strokeWidth="2" />
        </svg>
      </Floater>

      {/* Search bar */}
      <Floater speed={-0.4} depth={28} rotate={4} layer="near" phoneSlot="m-low3" pos={{ left: "13%", top: "86%" }} bob={{ duration: "6s", delay: "-2.5s" }}>
        <div className="o-pill">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <circle cx="10" cy="10" r="7" fill="none" stroke="#111" strokeWidth="2.5" />
            <path d="M15 15l6 6" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          best seo company near me<span className="caret" />
        </div>
      </Floater>

      {/* Page one chip */}
      <Floater speed={0.8} depth={10} rotate={7} layer="far" hideOnPhone pos={{ right: "20%", top: "20%" }} bob={{ duration: "7s", delay: "-4s" }}>
        <div className="o-chip" style={{ background: "var(--lime)", fontSize: 18 }}>Page 1 ✓</div>
      </Floater>

      <div className="wrap center">
        <Reveal as="span" className="label eyebrow">Why search matters</Reveal>
        <SplitText id="floatTitle" parts={["Every search is a ", { text: "customer", className: "ser" }, " looking for you."]} />
        <Reveal as="p">
          97% of people search online before they call a local business. We make sure they find you first, not your competitor.
        </Reveal>
        <Reveal>
          <MagneticLink href="#audit" arrow>See where you rank</MagneticLink>
        </Reveal>
      </div>
    </section>
  );
}
