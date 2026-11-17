"use client";

import { useState } from "react";
import { site } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { useReveal } from "@/hooks/useReveal";

const wordmark = ["b", "e", "s", "t", "s", "e", "o", ".", "u", "s"];

export function Footer() {
  const [note, setNote] = useState("One email a month. Unsubscribe anytime.");
  const [email, setEmail] = useState("");
  const markRef = useReveal<HTMLDivElement>();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to your email platform (Mailchimp, ConvertKit, HubSpot...)
    setNote(/.+@.+\..+/.test(email) ? "You're on the list. Thanks for subscribing." : "Enter a valid email address.");
  };

  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <Logo />
            <p style={{ color: "var(--ink-2)", maxWidth: "32ch" }}>{site.tagline}</p>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Technical SEO</a></li>
              <li><a href="#services">Content</a></li>
              <li><a href="#services">Local SEO</a></li>
              <li><a href="#services">Link building</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#why">Why us</a></li>
              <li><a href="#results">Results</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
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
          <span>Privacy · Terms</span>
          <button className="totop" type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
