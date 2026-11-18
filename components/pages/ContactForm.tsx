"use client";

import { useState } from "react";
import { submitLead } from "@/lib/lead";

export function ContactForm() {
  const [f, setF] = useState({ name: "", email: "", website: "", message: "" });
  const [trap, setTrap] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return setNote("Tell us your name.");
    if (!/.+@.+\..+/.test(f.email)) return setNote("Enter a valid email address.");
    if (f.message.trim().length < 10) return setNote("Add a short message so we know how to help.");
    setBusy(true);
    const err = trap ? null : await submitLead({ type: "contact", ...f });
    setBusy(false);
    if (err) return setNote(err);
    setDone(true);
    setNote("Thanks. A strategist will reply by email within one business day.");
  };

  return (
    <form className="rform" onSubmit={onSubmit} noValidate>
      <div className="rform-2">
        <div className="rform-row"><label htmlFor="c-name">Name</label><input id="c-name" autoComplete="name" value={f.name} onChange={set("name")} disabled={done} /></div>
        <div className="rform-row"><label htmlFor="c-email">Email</label><input id="c-email" type="email" autoComplete="email" value={f.email} onChange={set("email")} disabled={done} /></div>
      </div>
      <div className="rform-row"><label htmlFor="c-site">Website <small>(optional)</small></label><input id="c-site" inputMode="url" placeholder="yourwebsite.com" value={f.website} onChange={set("website")} disabled={done} /></div>
      <div className="rform-row"><label htmlFor="c-msg">How can we help?</label><textarea id="c-msg" rows={5} placeholder="Tell us about your business, your goals and any deadlines." value={f.message} onChange={set("message")} disabled={done} /></div>
      <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} name="company_url" />
      <button className="btn red" type="submit" disabled={busy || done}>{done ? "Message sent ✓" : busy ? "Sending…" : "Send message"} {!done && <span className="arrow" aria-hidden="true">↗</span>}</button>
      {note && <p className="lead-note" role="status">{note}</p>}
    </form>
  );
}
