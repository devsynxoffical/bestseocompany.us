"use client";

import { useRef, useState } from "react";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { useRafLoop } from "@/hooks/useRafLoop";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const before = [
  ["competitor-one.com", "#1"],
  ["directory-site.com", "#2"],
  ["competitor-two.com", "#3"],
];
const after = [
  ["competitor-one.com", "#2"],
  ["directory-site.com", "#3"],
  ["competitor-two.com", "#4"],
];

/** Draggable comparison of search results before and after. Sways on its own until touched. */
export function BeforeAfter() {
  const reduced = useReducedMotion();
  const [value, setValue] = useState(50);
  const touched = useRef(false);
  const box = useRef<HTMLDivElement>(null);

  useRafLoop((t) => {
    if (touched.current || !box.current) return;
    const r = box.current.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) setValue(Math.round((50 + Math.sin(t / 1100) * 18) * 10) / 10);
  }, !reduced);

  return (
    <section className="block" style={{ paddingTop: 40 }}>
      <div className="wrap ba-grid">
        <div>
          <Reveal as="span" variant="left" className="label eyebrow">Before &amp; after</Reveal>
          <SplitText parts={["From page three to the top spot."]} />
          <Reveal as="p">Drag the slider to compare a typical client&apos;s search results before we started and six months later.</Reveal>
        </div>
        <Reveal variant="scale" className="ba" data-cursor="Drag" style={{ ["--x" as string]: `${value}%` }}>
          <div ref={box} style={{ position: "absolute", inset: 0 }}>
            <div className="side before">
              <span className="tagx">Before</span>
              {before.map(([site, pos]) => (
                <div className="row" key={site}><span>{site}</span><span className="pos">{pos}</span></div>
              ))}
              <div className="row you"><span>yourwebsite.com</span><span className="pos">#27 · page 3</span></div>
              <div className="big">#27</div>
            </div>
            <div className="side after" aria-hidden="true">
              <span className="tagx">After</span>
              <div className="row you"><span>yourwebsite.com</span><span className="pos">#1</span></div>
              {after.map(([site, pos]) => (
                <div className="row" key={site}><span>{site}</span><span className="pos">{pos}</span></div>
              ))}
              <div className="big">#1</div>
            </div>
            <span className="handle" aria-hidden="true" />
            <label htmlFor="baRange" className="sr">Compare before and after</label>
            <input
              type="range"
              id="baRange"
              min={0}
              max={100}
              value={Math.round(value)}
              onChange={(e) => {
                touched.current = true;
                setValue(Number(e.target.value));
              }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
