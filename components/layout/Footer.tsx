"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { useReveal } from "@/hooks/useReveal";
import { submitLead } from "@/lib/lead";

const wordmark = ["b", "e", "s", "t", "s", "e", "o", ".", "u", "s"];

type FooterLink = { href: string; label: string };
export type FooterColumns = { services: FooterLink[]; industries: FooterLink[]; tools: FooterLink[]; guides: FooterLink[] };

export function Footer({ columns }: { columns: FooterColumns }) {
  const [note, setNote] = useState("One email a month. Unsubscribe anytime.");
  const [email, setEmail] = useState("");
  const markRef = useReveal<HTMLDivElement>();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) return setNote("Enter a valid email address.");
    const error = await submitLead({ type: "newsletter", email });
    setNote(error ?? "You're on the list. Thanks for subscribing.");
    if (!error) setEmail("");
  };

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <Logo />
            <p style={{ color: "var(--ink-2)", maxWidth: "32ch" }}>{site.tagline}</p>
          </div>
          {([
            ["Services", columns.services, "/services", "All services"],
            ["Industries", columns.industries, "/industries", "All industries"],
            ["Free tools", columns.tools, "", ""],
            ["Guides", columns.guides, "/guides", "All guides"],
          ] as const).map(([title, links, allHref, allLabel]) => (
            <div key={title}>
              <h4>{title}</h4>
              <ul>
                {links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
                {allHref && <li><Link href={allHref} className="foot-all">{allLabel} →</Link></li>}
              </ul>
            </div>
          ))}
          <div>
            <h4>SEO tips, monthly</h4>
            <form className="news" onSubmit={onSubmit} noValidate>
              <label htmlFor="newsEmail" className="sr">Email address</label>
              <input id="newsEmail" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn" type="submit">Join</button>
            </form>
            <p role="status" style={{ fontSize: 13, color: "var(--ink-2)", marginTop: 10, minHeight: "1.4em" }}>{note}</p>
            <p style={{ fontSize: 14, marginTop: 6 }}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <br />
              {site.hours}
            </p>
          </div>
        </div>

        <div className="wordmark" ref={markRef} aria-label="bestseo.us">
          {wordmark.map((ch, k) => (
            <i key={k} aria-hidden="true" style={{ ["--k" as string]: k, color: ch === "." ? "var(--lav)" : undefined }}>
              {ch}
            </i>
          ))}
        </div>

        <div className="legal">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="legal-links">
            <Link href="/about">About</Link> · <Link href="/contact">Contact</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · <Link href="/editorial-policy">Editorial policy</Link> · <Link href="/site-map">Sitemap</Link> · <a href="/llms.txt">llms.txt</a>
          </span>
          <button className="totop" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
