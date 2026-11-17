"use client";

import { useRef, useState } from "react";
import { hero } from "@/lib/content";
import { hasFinePointer, prefersReducedMotion } from "@/hooks/useReducedMotion";

/** Opening section: oversized headline, free-audit form and floating stat stickers. */
export function Hero() {
  const stickers = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!stickers.current || !hasFinePointer() || prefersReducedMotion()) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    stickers.current.querySelectorAll<HTMLElement>(".sticker").forEach((s) => {
      const d = Number(s.dataset.depth);
      s.style.setProperty("--mx", `${x * d}px`);
      s.style.setProperty("--my", `${y * d}px`);
    });
  };

  return (
    <section className="hero" onMouseMove={onMove}>
      <div className="wrap">
        <div className="hero-top">
          <span className="pill">
            <span className="dot" aria-hidden="true">★</span> {hero.badge}
          </span>
        </div>
        <div className="hero-title">
          <h1>
            <span className="row"><span>Rank <span className="serp">#1</span> on</span></span>
            <span className="row"><span>Google. <span className="hl">Grow</span></span></span>
            <span className="row"><span>for real.</span></span>
          </h1>
          <HeroCursors />
        </div>
        <div className="hero-grid">
          <p className="hero-copy">{hero.copy}</p>
          <AuditForm />
        </div>
      </div>
      <div className="stickers" ref={stickers} aria-hidden="true">
        {hero.stickers.map((s) => (
          <div key={s.label} className={`sticker ${s.className}`} data-depth={s.depth}>
            <div>
              <small>{s.label}</small>
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const heroCursors = [
  { name: "Your customer", className: "hc1" },
  { name: "Googlebot", className: "hc2" },
  { name: "SEO strategist", className: "hc3" },
];

/** Multiplayer-style named cursors that glide around the headline and "click" on words. */
function HeroCursors() {
  return (
    <div className="hero-cursors" aria-hidden="true">
      {heroCursors.map((c) => (
        <span key={c.name} className={`hcur ${c.className}`}>
          <svg viewBox="0 0 24 24" width="26" height="26">
            <path d="M3 2l18 8-8 2.5L10.5 21z" />
          </svg>
          <b>{c.name}</b>
        </span>
      ))}
    </div>
  );
}

function AuditForm() {
  const [site, setSite] = useState("");
  const [note, setNote] = useState(hero.formNote);
  const input = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = site.trim().replace(/^https?:\/\//, "");
    if (!/^[^\s]+\.[a-z]{2,}/i.test(clean)) {
      setNote("Enter a website address, like yourwebsite.com.");
      input.current?.focus();
      return;
    }
    // TODO: send `clean` to your CRM / email (e.g. a Next.js Route Handler at app/api/audit/route.ts)
    setNote(`Thanks. Your audit request for ${clean} is in the queue. We'll email you within 48 hours.`);
  };

  return (
    <div id="audit">
      <form className="audit" onSubmit={onSubmit} noValidate>
        <label htmlFor="site" className="sr">Your website</label>
        <input
          ref={input}
          id="site"
          name="site"
          type="text"
          inputMode="url"
          placeholder="yourwebsite.com"
          autoComplete="url"
          value={site}
          onChange={(e) => setSite(e.target.value)}
        />
        <button className="btn red" type="submit">
          Get my free audit <span className="arrow" aria-hidden="true">↗</span>
        </button>
      </form>
      <p className="audit-note" role="status">{note}</p>
    </div>
  );
}
