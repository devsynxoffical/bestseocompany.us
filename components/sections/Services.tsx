"use client";

import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceVisual } from "./ServiceVisuals";
import { useRafLoop } from "@/hooks/useRafLoop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cx } from "@/lib/utils";

const DURATION = 7000; // ms each tab stays open during autoplay

/**
 * Folder-tab service cards. Tabs autoplay with a progress bar (paused on hover or
 * when off screen) until the visitor picks one. Arrow keys move between tabs.
 */
export function Services() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [animKey, setAnimKey] = useState(0);
  const elapsed = useRef(0);
  const paused = useRef(false);
  const folders = useRef<HTMLDivElement>(null);
  const bars = useRef<Array<HTMLElement | null>>([]);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (i: number, focus = false) => {
    elapsed.current = 0;
    bars.current.forEach((b) => b && (b.style.transform = "scaleX(0)"));
    setActive(i);
    setAnimKey((k) => k + 1);
    if (focus) tabs.current[i]?.focus();
  };

  useEffect(() => {
    if (reduced) setAutoplay(false);
  }, [reduced]);

  useRafLoop((_, dt) => {
    const el = folders.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const inView = r.top < window.innerHeight && r.bottom > 0;
    if (paused.current || !inView) return;
    elapsed.current += dt;
    const bar = bars.current[active];
    if (bar) bar.style.transform = `scaleX(${Math.min(1, elapsed.current / DURATION)})`;
    if (elapsed.current >= DURATION) select((active + 1) % services.length);
  }, autoplay && !reduced);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { setAutoplay(false); select((i + 1) % services.length, true); }
    if (e.key === "ArrowLeft") { setAutoplay(false); select((i - 1 + services.length) % services.length, true); }
  };

  return (
    <section className="block" id="services" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={["Four ways we move you up."]} />
          <Reveal as="p">Most clients start with one service and add more once the numbers prove out. Pick a tab, or let it play.</Reveal>
        </div>

        <Reveal className="folders">
          <div ref={folders} onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
            <div className="tabs" role="tablist" aria-label="Services">
              {services.map((s, i) => (
                <button
                  key={s.id}
                  ref={(el) => { tabs.current[i] = el; }}
                  className="tab"
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-controls={`panel-${s.id}`}
                  aria-selected={i === active}
                  tabIndex={i === active ? 0 : -1}
                  data-c={s.color}
                  onClick={() => { setAutoplay(false); select(i); }}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  Service<span className="tn"> / 0{i + 1}</span>
                  <span className="bar" aria-hidden="true"><i ref={(el) => { bars.current[i] = el; }} /></span>
                </button>
              ))}
            </div>

            <div
              className={cx("panel-card", active !== 0 && "not-first", active === services.length - 1 && "last")}
              style={{ ["--active" as string]: `var(--${services[active].color})` }}
            >
              {services.map((s, i) => (
                <div
                  key={i === active ? `${s.id}-${animKey}` : s.id}
                  className={cx("panel", i === active && !reduced && animKey > 0 && "anim")}
                  role="tabpanel"
                  id={`panel-${s.id}`}
                  aria-labelledby={`tab-${s.id}`}
                  hidden={i !== active}
                >
                  <div className="panel-text">
                    <h3>{s.title}</h3>
                    <p>{s.copy}</p>
                    <ul>{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                    <div className="panel-stat"><b>{s.stat}</b><span>{s.statLabel}</span></div>
                  </div>
                  <ServiceVisual type={s.visual} active={i === active} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
