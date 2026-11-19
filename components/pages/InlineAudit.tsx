"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead";
import type { Color } from "@/lib/pages/types";

/** Compact mid-page lead card: website + email → free audit request. */
export function InlineAudit({ heading, copy, color = "lime", points }: { heading: string; copy: string; color?: Color; points: string[] }) {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s]+\.[a-z]{2,}/i.test(website.replace(/^https?:\/\//, ""))) return setNote("Enter your website, like yourwebsite.com.");
    if (!/.+@.+\..+/.test(email)) return setNote("Enter a valid email so we can send your audit.");
    setBusy(true);
    const err = await submitLead({ type: "audit", website, email });
    setBusy(false);
    if (err) return setNote(err);
    setDone(true);
    setNote("Request received. Your audit arrives by email within 48 hours.");
  };

  return (
    <div className="ia" style={{ ["--pc" as string]: `var(--${color})` }}>
      <div className="ia-copy">
        <span className="label">Free · no obligation</span>
        <h2>{heading}</h2>
        <p>{copy}</p>
        <ul>{points.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
      <form className="ia-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="ia-site">Your website</label>
        <input id="ia-site" type="text" inputMode="url" placeholder="yourwebsite.com" value={website} onChange={(e) => setWebsite(e.target.value)} disabled={done} />
        <label htmlFor="ia-email">Where should we send it?</label>
        <input id="ia-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={done} />
        <button className="btn red" type="submit" disabled={busy || done}>{done ? "Request sent ✓" : busy ? "Sending…" : "Send my free audit"} {!done && <span className="arrow" aria-hidden="true">↗</span>}</button>
        {note && <p className="lead-note" role="status">{note}</p>}
        <p className="ia-fine">We reply from a real person. No spam, no sales calls you didn&apos;t ask for.</p>
      </form>
    </div>
  );
}
