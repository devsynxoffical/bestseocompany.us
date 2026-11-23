"use client";

import Link from "next/link";
import { useState } from "react";
import { submitLead } from "@/lib/lead";
import { Reveal } from "@/components/ui/Reveal";
import type { Color } from "@/lib/pages/types";

/** Closing call to action with a free-audit form (website + email). */
export function LeadBand({ heading, copy, color = "lime" }: { heading: string; copy: string; color?: Color }) {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [trap, setTrap] = useState("");
  const [note, setNote] = useState("Free 40-point audit with a short video walkthrough. No sales pressure.");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s]+\.[a-z]{2,}/i.test(website.replace(/^https?:\/\//, ""))) return setNote("Enter your website address, like yourwebsite.com.");
    if (!/.+@.+\..+/.test(email)) return setNote("Enter a valid email so we can send your audit.");
    setBusy(true);
    const error = trap ? null : await submitLead({ type: "audit", website, email });
    setBusy(false);
    if (error) return setNote(error);
    setDone(true);
    setNote(`Thanks. We'll review ${website.replace(/^https?:\/\//, "")} and email ${email} within 48 hours.`);
  };

  return (
    <section className="block" id="audit" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal variant="clip" className="lead-band" style={{ ["--pc" as string]: `var(--${color})` }}>
          <span className="blob b1" aria-hidden="true" />
          <span className="blob b2" aria-hidden="true" />
          <div className="lead-copy">
            <h2>{heading}</h2>
            <p>{copy}</p>
          </div>
          <form className="lead-form" onSubmit={onSubmit} noValidate>
            <label className="sr" htmlFor="lb-site">Your website</label>
            <input id="lb-site" type="text" inputMode="url" placeholder="yourwebsite.com" value={website} onChange={(e) => setWebsite(e.target.value)} disabled={done} />
            <label className="sr" htmlFor="lb-email">Your email</label>
            <input id="lb-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={done} />
            <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} name="company_url" />
            <button className="btn" type="submit" disabled={busy || done}>{done ? "Request sent ✓" : busy ? "Sending…" : "Get my free audit"} {!done && <span className="arrow" aria-hidden="true">↗</span>}</button>
            <p className="lead-note" role="status">{note}</p>
            {!done && <p className="lead-alt">Prefer to talk first? <Link href="/contact">Contact our team</Link></p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
