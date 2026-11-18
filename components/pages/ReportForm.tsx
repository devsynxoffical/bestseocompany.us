"use client";

import { useState } from "react";
import { submitLead, type LeadType } from "@/lib/lead";

/** Request form for report-based tools (backlinks, traffic, rankings). */
export function ReportForm({ type, cta, withKeywords }: { type: LeadType; cta: string; withKeywords?: boolean }) {
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [trap, setTrap] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s]+\.[a-z]{2,}/i.test(website.replace(/^https?:\/\//, ""))) return setNote("Enter your website address, like yourwebsite.com.");
    if (!/.+@.+\..+/.test(email)) return setNote("Enter a valid email so we can send your report.");
    setBusy(true);
    const err = trap ? null : await submitLead({ type, website, email, keywords: withKeywords ? keywords : undefined, location: withKeywords ? location : undefined });
    setBusy(false);
    if (err) return setNote(err);
    setDone(true);
    setNote("Request received. Our team will run your report and email it to you.");
  };

  return (
    <form className="rform" onSubmit={onSubmit} noValidate>
      <div className="rform-row">
        <label htmlFor={`${type}-site`}>Website</label>
        <input id={`${type}-site`} type="text" inputMode="url" placeholder="yourwebsite.com" value={website} onChange={(e) => setWebsite(e.target.value)} disabled={done} />
      </div>
      {withKeywords && (
        <>
          <div className="rform-row">
            <label htmlFor={`${type}-kw`}>Keywords to check <small>(one per line, up to 20)</small></label>
            <textarea id={`${type}-kw`} rows={3} placeholder={"roofing company austin\nroof repair near me"} value={keywords} onChange={(e) => setKeywords(e.target.value)} disabled={done} />
          </div>
          <div className="rform-row">
            <label htmlFor={`${type}-loc`}>Location <small>(city or "United States")</small></label>
            <input id={`${type}-loc`} type="text" placeholder="Austin, TX" value={location} onChange={(e) => setLocation(e.target.value)} disabled={done} />
          </div>
        </>
      )}
      <div className="rform-row">
        <label htmlFor={`${type}-email`}>Email for the report</label>
        <input id={`${type}-email`} type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={done} />
      </div>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} name="company_url" />
      <button className="btn red" type="submit" disabled={busy || done}>
        {done ? "Request sent ✓" : busy ? "Sending…" : cta} {!done && <span className="arrow" aria-hidden="true">↗</span>}
      </button>
      {note && <p className="lead-note" role="status">{note}</p>}
    </form>
  );
}
