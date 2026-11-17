"use client";

import { useEffect, useRef, useState } from "react";
import { audiences } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const colors = ["var(--lav)", "var(--pink)", "var(--lime)", "var(--taupe)", "var(--lav)", "var(--pink)"];

/** "We help [plumbers] get found" with a rotating audience word and hoverable industry pills. */
export function WhoWeHelp() {
  const reduced = useReducedMotion();
  const words = [...audiences.rotating, audiences.rotating[0]]; // last item loops seamlessly
  const [index, setIndex] = useState(0);
  const [instant, setInstant] = useState(false);
  const [width, setWidth] = useState<number | undefined>();
  const rot = useRef<HTMLSpanElement>(null);

  // Size the highlight to the active word.
  useEffect(() => {
    const measure = () => {
      const el = rot.current;
      const item = el?.querySelectorAll<HTMLElement>("b")[index];
      if (!el || !item) return;
      setWidth(item.offsetWidth + parseFloat(getComputedStyle(el).paddingLeft) * 2);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setInstant(false);
      setIndex((i) => i + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [reduced]);

  // Jump back to the first word without animation once we reach the duplicate.
  useEffect(() => {
    if (index !== words.length - 1) return;
    const t = setTimeout(() => {
      setInstant(true);
      setIndex(0);
    }, 650);
    return () => clearTimeout(t);
  }, [index, words.length]);

  return (
    <section className="block help" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <Reveal as="span" variant="left" className="label eyebrow">Who we work with</Reveal>
        <Reveal as="h2">
          We help{" "}
          <span className="rot" ref={rot} style={{ width, background: colors[index % colors.length] }}>
            <span className="list">
              {words.map((w, i) => (
                <b key={i} aria-hidden={i !== index} style={{ transform: `translateY(${-index * 100}%)`, transition: instant ? "none" : undefined }}>
                  {w}
                </b>
              ))}
            </span>
          </span>
          <br />
          get found on Google.
        </Reveal>
        <div className="inds">
          {audiences.industries.map((name, i) => (
            <Reveal as="span" key={name} variant="tilt" delay={(i % 5 || undefined) as 1 | 2 | 3 | 4 | undefined} className="ind">
              {name}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
