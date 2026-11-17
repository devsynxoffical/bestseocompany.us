"use client";

import { useEffect, useRef } from "react";
import { statement } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { useRafLoop } from "@/hooks/useRafLoop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/utils";

const words = (text: string, key: string) =>
  text.split(/(\s+)/).map((w, i) => (!w ? null : /^\s+$/.test(w) ? w : <span className="wd" key={`${key}${i}`}>{w}</span>));

/** About statement: words fill from grey to ink as you scroll, then four count-up stats. */
export function Statement() {
  const reduced = useReducedMotion();
  const p = useRef<HTMLParagraphElement>(null);
  const list = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (reduced || !p.current) return;
    list.current = Array.from(p.current.querySelectorAll<HTMLElement>(".wd"));
    p.current.classList.add("js");
  }, [reduced]);

  useRafLoop(() => {
    const el = p.current;
    if (!el || !list.current.length) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const prog = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0, 1);
    const n = Math.round(prog * list.current.length);
    list.current.forEach((w, i) => w.classList.toggle("lit", i < n));
  }, !reduced);

  return (
    <section className="block statement">
      <div className="wrap">
        <Reveal as="span" variant="left" className="label eyebrow">About us</Reveal>
        <p className="big" ref={p}>
          {statement.parts.map((part, i) =>
            typeof part === "string" ? words(part, `s${i}`) : (
              <span key={i} className={`chip ${part.chip}`}>{words(part.text, `c${i}`)}</span>
            ),
          )}
        </p>
        <Reveal className="stat-row">
          {statement.stats.map((s) => (
            <div className="stat" key={s.label}>
              <b><CountUp to={s.value} suffix={s.suffix} /></b>
              <span>{s.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
