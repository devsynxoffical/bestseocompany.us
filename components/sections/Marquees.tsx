"use client";

import { useRef } from "react";
import { marqueeRows } from "@/lib/content";
import { useRafLoop } from "@/hooks/useRafLoop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clamp } from "@/lib/utils";

const speeds = [0.6, -0.5];

/** Two tilted ticker bands. They speed up, reverse and lean with scroll velocity. */
export function Marquees() {
  const reduced = useReducedMotion();
  const tracks = useRef<Array<HTMLDivElement | null>>([]);
  const xs = useRef([0, 0]);
  const state = useRef({ lastY: 0, vel: 0 });

  useRafLoop((_, dt) => {
    const y = window.scrollY;
    const s = state.current;
    s.vel += (y - s.lastY - s.vel) * 0.1;
    s.lastY = y;
    tracks.current.forEach((el, i) => {
      if (!el) return;
      const half = el.scrollWidth / 2;
      const boost = 1 + Math.min(6, Math.abs(s.vel) * 0.15);
      xs.current[i] -= speeds[i] * dt * 0.06 * boost * (s.vel < -1 ? -1 : 1);
      if (xs.current[i] <= -half) xs.current[i] += half;
      if (xs.current[i] > 0) xs.current[i] -= half;
      el.style.transform = `translateX(${xs.current[i]}px) skewX(${clamp(-s.vel * 0.25, -8, 8)}deg)`;
    });
  }, !reduced);

  return (
    <div className="marquees" aria-label="Where we get you found">
      {marqueeRows.map((row, i) => (
        <div key={i} className={`mq ${i === 0 ? "a" : "b"}`}>
          <div className="track" ref={(el) => { tracks.current[i] = el; }}>
            {[...row, ...row].map((item, k) => (
              <span key={k} aria-hidden={k >= row.length ? true : undefined}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
