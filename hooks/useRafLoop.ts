"use client";

import { useEffect, useRef } from "react";

/**
 * Runs `callback(time, delta)` on every animation frame while mounted.
 * The latest callback is always used, so it can read fresh props/state.
 */
export function useRafLoop(callback: (time: number, delta: number) => void, enabled = true) {
  const cb = useRef(callback);
  cb.current = callback;

  useEffect(() => {
    if (!enabled) return;
    let id = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      cb.current(t, dt);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [enabled]);
}
