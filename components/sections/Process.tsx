"use client";

import { useRef, useState } from "react";
import { processSteps } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { useRafLoop } from "@/hooks/useRafLoop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/utils";

/** Four-step process on a dark band. A green line fills with scroll and lights each step. */
export function Process() {
  const reduced = useReducedMotion();
  const steps = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(1);

  useRafLoop(() => {
    const el = steps.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.round(clamp((vh * 0.8 - r.top) / (r.height + vh * 0.2), 0, 1) * 1000) / 1000;
    setProgress((old) => (old === p ? old : p));
  }, !reduced);

  return (
    <section className="block process" id="process">
      <div className="wrap">
        <div className="sec-head">
          <SplitText parts={["How we work, step by step."]} style={{ color: "var(--paper)" }} />
          <Reveal as="p">The first 90 days follow the same four steps for every client. After that we repeat steps 3 and 4 every month.</Reveal>
        </div>
        <div className="ptrack" aria-hidden="true"><i style={{ ["--pp" as string]: progress }} /></div>
        <ol className="steps" ref={steps} style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {processSteps.map((s, i) => (
            <Reveal
              as="li"
              key={s.num}
              delay={(i || undefined) as 1 | 2 | 3 | undefined}
              className={`step${progress >= ((i + 0.5) / processSteps.length) * 0.9 ? " on" : ""}`}
            >
              <span className="num" aria-hidden="true">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <span className="when">{s.when}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
