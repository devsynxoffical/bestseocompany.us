"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { site } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { submitLead } from "@/lib/lead";
import { PreferredSourceButton } from "@/components/ui/PreferredSource";

export type FooterLink = { href: string; label: string };
export type FooterColumn = { title: string; links: FooterLink[]; more?: FooterLink };

const trust = ["Month-to-month after 90 days", "White-hat only", "US-based team", "Plain-English reports"];
const ticker = ["Local SEO", "Technical SEO", "AI search", "Link building", "Google Maps", "Ecommerce SEO", "Content that ranks", "Monthly reports"];
// Each column gets one of the site colors for its accent dot, hover color and underline.
const COL_COLORS = ["var(--lav)", "var(--pink)", "var(--lime)", "var(--taupe)", "var(--lav)"];

// Two-line wordmark: "best" / "seocompany.us". `k` is the letter's position across both lines (animation order).
const wordLines: { ch: string; cls: string }[][] = [
  [..."best"].map((ch) => ({ ch, cls: "w-a" })),
  [
    ...[..."seo"].map((ch) => ({ ch, cls: "w-b" })),
    ...[..."company"].map((ch) => ({ ch, cls: "w-d" })),
    { ch: ".", cls: "dot" },
    ...[..."us"].map((ch) => ({ ch, cls: "w-c" })),
  ],
];

/** Sets --rx/--ry (degrees) on the element from the pointer position, for a 3D tilt. */
function tilt(e: PointerEvent<HTMLElement>, max: number) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.setProperty("--ry", `${(x * max).toFixed(2)}deg`);
  el.style.setProperty("--rx", `${(-y * max).toFixed(2)}deg`);
  el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
  el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
}
function untilt(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
}

/**
 * Site footer: animated aurora background with a 3D grid floor, service ticker,
 * brand + link columns, tilt-on-hover newsletter card, 3D wordmark and legal bar.
 * Animations run only while the footer is on screen and are off for reduced motion.
 */
export function Footer({ columns }: { columns: FooterColumn[] }) {
  const [note, setNote] = useState("No spam. Unsubscribe anytime.");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Reveal on first view, pause animations while off screen, and drive the back-to-top progress ring.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("ft-js");
    const io = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle("ft-on", entry.isIntersecting);
        if (entry.isIntersecting) el.classList.add("ft-in");
      },
      { threshold: 0.04 },
    );
    io.observe(el);
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        el.style.setProperty("--prog", String(max > 0 ? Math.min(1, scrollY / max) : 0));
      });
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) return setNote("Enter a valid email address.");
    setBusy(true);
    const error = await submitLead({ type: "newsletter", email });
    setBusy(false);
    setNote(error ?? "You're on the list. Thanks for subscribing.");
    if (!error) setEmail("");
  };

  return (
    <footer className="ft" ref={ref}>
      {/* Animated background: aurora blobs, 3D grid floor, floating orbs */}
      <div className="ft-bg" aria-hidden="true">
        <span className="ft-blob b1" /><span className="ft-blob b2" /><span className="ft-blob b3" /><span className="ft-blob b4" />
        <div className="ft-floor"><div className="ft-floor-grid" /></div>
        <span className="ft-orb o1" /><span className="ft-orb o2" /><span className="ft-orb o3" />
      </div>

      {/* Call to action (hidden on pages that already end with their own lead section) */}
      <div className="wrap">
        <div className="ft-cta">
          <div className="ft-cta-copy">
            <span className="ft-eyebrow"><i aria-hidden="true" />Free 40-point SEO audit</span>
            <h2>Ready to see where you <em>rank?</em></h2>
            <p>Send us your website. A strategist reviews it and sends your top five fixes within 48 hours.</p>
          </div>
          <div className="ft-cta-actions">
            <Link href="/free-seo-audit" className="ft-pill ft-pill-lime">Get my free audit <span aria-hidden="true">↗</span></Link>
            <Link href="/contact" className="ft-pill ft-pill-ghost">Talk to a strategist</Link>
          </div>
          <ul className="ft-trust" aria-label="How we work">
            {trust.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>

      {/* Service ticker */}
      <div className="ft-ticker" aria-hidden="true">
        <div className="ft-ticker-track">
          {[0, 1].map((g) => (
            <div className="ft-ticker-g" key={g}>
              {ticker.map((t, i) => (
                <span key={t} className={i % 2 ? "out" : undefined}>{t}<b>✳</b></span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Brand + links */}
      <div className="wrap ft-main">
        <div className="ft-brand ft-rv" style={{ "--d": 0 } as CSSProperties}>
          <Link href="/" className="ft-logo" aria-label="Best SEO Company home">
            <span className="ft-logo-3d"><LogoMark /></span>
            <span>bestseocompany<span className="ft-tld">.us</span></span>
          </Link>
          <p className="ft-tag">{site.tagline}</p>
          <dl className="ft-contact">
            <div><dt>Email</dt><dd><a href={`mailto:${site.email}`} className="ft-ul">{site.email}</a></dd></div>
            <div><dt>Hours</dt><dd><span className="ft-live" aria-hidden="true" />{site.hours}</dd></div>
          </dl>
          <div className="ft-ps">
            <span className="ft-label">Follow us on Google</span>
            <PreferredSourceButton placement="footer" />
          </div>
        </div>

        <nav className="ft-cols" aria-label="Footer">
          {columns.map((col, ci) => (
            <div key={col.title} className="ft-col ft-rv" style={{ "--c": COL_COLORS[ci % COL_COLORS.length], "--d": ci + 1 } as CSSProperties}>
              <h3><i aria-hidden="true" />{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}><Link href={l.href} className="ft-link"><span>{l.label}</span></Link></li>
                ))}
                {col.more && (
                  <li className="ft-more-li"><Link href={col.more.href} className="ft-more">{col.more.label} <span aria-hidden="true">→</span></Link></li>
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Newsletter card (3D tilt + rotating gradient border) */}
      <div className="wrap ft-rv" style={{ "--d": 6 } as CSSProperties}>
        <div className="ft-news-wrap" onPointerMove={(e) => tilt(e, 6)} onPointerLeave={untilt}>
          <form className="ft-news" onSubmit={onSubmit} noValidate>
            <span className="ft-news-shine" aria-hidden="true" />
            <div className="ft-news-copy">
              <label htmlFor="newsEmail" className="ft-label">SEO tips, monthly</label>
              <b>One practical SEO email a month.</b>
              <p role="status" className="ft-news-note">{note}</p>
            </div>
            <div className="ft-news-row">
              <input id="newsEmail" type="email" placeholder="you@company.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button type="submit" disabled={busy}>{busy ? "…" : "Subscribe"}</button>
            </div>
          </form>
        </div>
      </div>

      {/* 3D wordmark + closing call to action */}
      <div className="wrap ft-bottom">
        <div className="ft-stage" onPointerMove={(e) => tilt(e, 14)} onPointerLeave={untilt}>
          <div className="ft-mark" aria-hidden="true">
            {wordLines.map((line, li) => (
              <span key={li} className="ft-mark-line">
                {line.map((l, j) => {
                  const k = li === 0 ? j : wordLines[0].length + j;
                  return <i key={j} className={l.cls} style={{ "--k": k } as CSSProperties}>{l.ch}</i>;
                })}
              </span>
            ))}
          </div>
        </div>
        <div className="ft-close ft-rv" style={{ "--d": 7 } as CSSProperties}>
          <p>Rank #1 with Best SEO Company. Start with a free 40-point audit.</p>
          <Link href="/free-seo-audit" className="ft-pill ft-pill-lime">Get my free audit <span aria-hidden="true">↗</span></Link>
        </div>
      </div>

      {/* Legal bar */}
      <div className="wrap">
        <div className="ft-legal">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <nav aria-label="Legal" className="ft-legal-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/editorial-policy">Editorial policy</Link>
            <Link href="/site-map">Sitemap</Link>
            <a href="/llms.txt">llms.txt</a>
          </nav>
          <button className="ft-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
            <svg viewBox="0 0 44 44" aria-hidden="true">
              <circle cx="22" cy="22" r="20" className="ft-top-track" />
              <circle cx="22" cy="22" r="20" className="ft-top-ring" pathLength={1} />
            </svg>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
