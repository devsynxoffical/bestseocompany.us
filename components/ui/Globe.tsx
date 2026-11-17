"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

// Pins: major US metro areas [lat, lon]
const CITIES: Array<[number, number]> = [
  [40.7, -74], [30.3, -97.7], [25.8, -80.2], [39.7, -105], [34, -118.2],
  [41.9, -87.6], [47.6, -122.3], [33.7, -84.4], [29.8, -95.4], [42.4, -71.1],
];

/**
 * Dotted 3D globe drawn on a canvas. Spins slowly, can be dragged, and shows
 * pulsing pins on US cities. Only draws while on screen.
 */
export function Globe({ dragTarget }: { dragTarget: React.RefObject<HTMLElement | null> }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    const tile = dragTarget.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !tile || !ctx) return;
    const reduced = prefersReducedMotion();

    // Fibonacci sphere
    const N = 900;
    const pts: Array<[number, number, number]> = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      pts.push([Math.cos(th) * rad, y, Math.sin(th) * rad]);
    }
    const cities = CITIES.map(([la, lo]) => {
      const a = (la * Math.PI) / 180, b = (lo * Math.PI) / 180;
      return [Math.cos(a) * Math.sin(b), Math.sin(a), Math.cos(a) * Math.cos(b)] as [number, number, number];
    });

    let rot = 1.75, spin = 0.0012, drag: number | null = null, W = 0, H = 0, id = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const size = () => {
      const r = tile.getBoundingClientRect();
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      const R = Math.min(W, H) * 0.4, cx = W / 2, cy = H * 0.46;
      const tilt = 0.38, ct = Math.cos(tilt), st = Math.sin(tilt), cr = Math.cos(rot), sr = Math.sin(rot);
      const proj = (p: [number, number, number]) => {
        const x = p[0] * cr + p[2] * sr, z = -p[0] * sr + p[2] * cr, y = p[1];
        return [cx + x * R, cy - (y * ct - z * st) * R, y * st + z * ct];
      };
      const glow = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R * 1.1);
      glow.addColorStop(0, "rgba(169,155,251,.18)");
      glow.addColorStop(1, "rgba(169,155,251,0)");
      ctx.fillStyle = glow;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.1, 0, 7); ctx.fill();

      for (const p of pts) {
        const q = proj(p);
        if (q[2] < -0.1) continue;
        ctx.fillStyle = `rgba(243,242,238,${(0.15 + q[2] * 0.55).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(q[0], q[1], 1.2 + q[2] * 0.9, 0, 7); ctx.fill();
      }
      cities.forEach((c, j) => {
        const q = proj(c);
        if (q[2] < 0) return;
        const pulse = (Math.sin(t / 500 + j) + 1) / 2;
        ctx.fillStyle = `rgba(162,242,127,${(0.25 * (1 - pulse)).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(q[0], q[1], 6 + pulse * 10, 0, 7); ctx.fill();
        ctx.fillStyle = "#A2F27F";
        ctx.beginPath(); ctx.arc(q[0], q[1], 4, 0, 7); ctx.fill();
      });
    };

    const loop = (t: number) => {
      const r = tile.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) {
        if (drag === null && !reduced) { spin += (0.0012 - spin) * 0.02; rot += spin; }
        draw(t);
      }
      id = requestAnimationFrame(loop);
    };

    const down = (e: PointerEvent) => { drag = e.clientX; tile.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (drag === null) return;
      rot -= (e.clientX - drag) * 0.008;
      spin = -(e.clientX - drag) * 0.002;
      drag = e.clientX;
    };
    const up = () => { drag = null; };

    size();
    document.fonts?.ready.then(size);
    window.addEventListener("resize", size);
    tile.addEventListener("pointerdown", down);
    tile.addEventListener("pointermove", move);
    tile.addEventListener("pointerup", up);
    tile.addEventListener("pointercancel", up);
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", size);
      tile.removeEventListener("pointerdown", down);
      tile.removeEventListener("pointermove", move);
      tile.removeEventListener("pointerup", up);
      tile.removeEventListener("pointercancel", up);
    };
  }, [dragTarget]);

  return <canvas ref={canvas} aria-hidden="true" />;
}
