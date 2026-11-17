"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";

/** Accordion: one answer open at a time, with smooth height animation. */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="block" id="faq" style={{ paddingTop: 24 }}>
      <div className="wrap faq-grid">
        <div>
          <Reveal as="span" variant="left" className="label eyebrow">FAQ</Reveal>
          <SplitText parts={["Questions we hear a lot."]} />
        </div>
        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={(i ? Math.min(i, 4) : undefined) as 1 | 2 | 3 | 4 | undefined} className={`qa${isOpen ? " open" : ""}`}>
                <button type="button" id={`q${i}`} aria-expanded={isOpen} aria-controls={`a${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  {f.q} <span className="pm" aria-hidden="true">+</span>
                </button>
                <div className="ans" id={`a${i}`} role="region" aria-labelledby={`q${i}`}>
                  <div><p>{f.a}</p></div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
