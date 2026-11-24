"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/content";
import { LogoMark } from "@/components/ui/Logo";
import { useReveal } from "@/hooks/useReveal";
import { submitLead } from "@/lib/lead";
import { PreferredSourceButton } from "@/components/ui/PreferredSource";

// Two-line wordmark: "best" / "seocompany.us". `k` keeps the letter-by-letter reveal order across both lines.
const wordLines: { ch: string; cls?: string }[][] = [
  [..."best"].map((ch) => ({ ch, cls: "w-a" })),
  [
    ...[..."seo"].map((ch) => ({ ch, cls: "w-b" })),
    ...[..."company"].map((ch) => ({ ch, cls: "w-d" })),
    { ch: ".", cls: "dot" },
    ...[..."us"].map((ch) => ({ ch, cls: "w-c" })),
  ],
];

export type FooterLink = { href: string; label: string };
export type FooterColumn = { title: string; links: FooterLink[]; more?: FooterLink };

const trust = ["Month-to-month after 90 days", "White-hat only", "US-based team", "Plain-English reports"];

/** Site footer: call-to-action band, link columns, newsletter, wordmark and legal bar. */
export function Footer({ columns }: { columns: FooterColumn[] }) {
  const [note, setNote] = useState("No spam. Unsubscribe anytime.");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const markRef = useReveal<HTMLDivElement>();

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
    <footer className="ft">
      {/* Call to action */}
      <div className="wrap">
        <div className="ft-cta">
          <div className="ft-cta-copy">
            <span className="ft-eyebrow">Free 40-point SEO audit</span>
            <h2>Ready to see where you rank?</h2>
            <p>Send us your website. A strategist reviews it and sends your top five fixes within 48 hours.</p>
          </div>
          <div className="ft-cta-actions">
            <Link href="/free-seo-audit" className="btn ft-btn-primary">Get my free audit <span className="arrow" aria-hidden="true">↗</span></Link>
            <Link href="/contact" className="btn ft-btn-ghost">Talk to a strategist</Link>
          </div>
          <ul className="ft-trust" aria-label="How we work">
            {trust.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </div>

      {/* Brand + links */}
      <div className="wrap ft-main">
        <div className="ft-brand">
          <Link href="/" className="ft-logo" aria-label="Best SEO Company home">
            <LogoMark />
            <span>bestseocompany<span className="ft-tld">.us</span></span>
          </Link>
          <p className="ft-tag">{site.tagline}</p>
          <dl className="ft-contact">
            <div><dt>Email</dt><dd><a href={`mailto:${site.email}`}>{site.email}</a></dd></div>
            <div><dt>Hours</dt><dd>{site.hours}</dd></div>
          </dl>
          <div className="ft-ps">
            <span className="ft-label">Follow us on Google</span>
            <PreferredSourceButton placement="footer" />
          </div>
        </div>

        <nav className="ft-cols" aria-label="Footer">
          {columns.map((col) => (
            <div key={col.title} className="ft-col">
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
                {col.more && <li className="ft-more-li"><Link href={col.more.href} className="ft-more">{col.more.label} <span aria-hidden="true">→</span></Link></li>}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Newsletter strip */}
      <div className="wrap">
        <form className="ft-news" onSubmit={onSubmit} noValidate>
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

      {/* Wordmark + closing call to action */}
      <div className="wrap ft-bottom">
        <div className="wordmark ft-mark" ref={markRef} aria-hidden="true">
          {wordLines.map((line, li) => (
            <span key={li} className="ft-mark-line">
              {line.map((l, j) => {
                const k = li === 0 ? j : wordLines[0].length + j;
                return <i key={j} className={l.cls} style={{ ["--k" as string]: k }}>{l.ch}</i>;
              })}
            </span>
          ))}
        </div>
        <div className="ft-close">
          <p>Rank #1 with Best SEO Company. Start with a free 40-point audit.</p>
          <Link href="/free-seo-audit" className="ft-close-btn">Get my free audit <span aria-hidden="true">↗</span></Link>
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
          <button className="ft-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
