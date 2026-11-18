"use client";

import { useState } from "react";
import type { FAQ } from "@/lib/pages/types";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function FaqAccordion({ faqs, heading = "Frequently asked questions", idPrefix = "faq" }: { faqs: FAQ[]; heading?: string; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="block" id="faq" style={{ paddingTop: 24 }}>
      <div className="wrap faq-grid">
        <div>
          <Reveal as="span" variant="left" className="label eyebrow">FAQ</Reveal>
          <SplitText parts={[heading]} />
        </div>
        <div>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={(i ? Math.min(i, 4) : undefined) as 1 | 2 | 3 | 4 | undefined} className={`qa${isOpen ? " open" : ""}`}>
                <button type="button" id={`${idPrefix}-q${i}`} aria-expanded={isOpen} aria-controls={`${idPrefix}-a${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                  {f.q} <span className="pm" aria-hidden="true">+</span>
                </button>
                <div className="ans" id={`${idPrefix}-a${i}`} role="region" aria-labelledby={`${idPrefix}-q${i}`}>
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
