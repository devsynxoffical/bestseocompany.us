"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Trailing cursor dot (mouse devices only). It grows into a labelled bubble over
 * elements with `data-cursor="Label"` and into a soft ring over links and buttons.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, x = mx, y = my, id = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      el.classList.add("on");
    };
    const leave = () => el.classList.remove("on");
    const over = (e: MouseEvent) => {
      const t = e.target as Element;
      const big = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a,button,.tab,input[type=range]");
      el.classList.toggle("big", !!big);
      el.classList.toggle("link", !big && !!link);
      if (big && label.current) label.current.textContent = big.dataset.cursor ?? "";
    };
    const loop = () => {
      x += (mx - x) * 0.2;
      y += (my - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px)`;
      id = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", over);
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <span ref={label}>View</span>
    </div>
  );
}
