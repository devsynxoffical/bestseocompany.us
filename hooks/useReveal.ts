"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./useReducedMotion";

type Options = {
  /** Called once when the element scrolls into view (or never, if it was already visible). */
  onReveal?: () => void;
  /** Called on mount when the element starts below the fold (use it to reset counters, etc.). */
  onHide?: () => void;
  threshold?: number;
  rootMargin?: string;
};

/**
 * Scroll reveal that keeps the page complete at rest:
 * elements render visible on the server, and only those that start
 * below the fold get the `pre` class (hidden state) until they enter view.
 */
export function useReveal<T extends Element>({ onReveal, onHide, threshold = 0.05, rootMargin = "0px 0px -12% 0px" }: Options = {}) {
  const ref = useRef<T>(null);
  const reveal = useRef(onReveal);
  const hide = useRef(onHide);
  reveal.current = onReveal;
  hide.current = onHide;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) return;

    el.classList.add("pre");
    hide.current?.();
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        el.classList.remove("pre");
        reveal.current?.();
        io.disconnect();
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
