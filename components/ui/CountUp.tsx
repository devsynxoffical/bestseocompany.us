"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { easeOutQuart, formatNumber } from "@/lib/utils";

type Props = {
  to: number;
  decimals?: number;
  separator?: boolean;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Number that counts up from zero when scrolled into view. Server-renders the final value. */
export function CountUp({ to, decimals = 0, separator = false, prefix = "", suffix = "", duration = 1600, className }: Props) {
  const fmt = (v: number) => formatNumber(v, { decimals, separator, prefix, suffix });
  const [text, setText] = useState(() => fmt(to));
  const raf = useRef(0);

  const ref = useReveal<HTMLSpanElement>({
    onHide: () => setText(fmt(0)),
    onReveal: () => {
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / duration);
        setText(fmt(to * easeOutQuart(p)));
        if (p < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    },
  });

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {text}
    </span>
  );
}
