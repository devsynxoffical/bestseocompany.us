"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { submitLead } from "@/lib/lead";
import { track } from "@/lib/analytics";
import { cx } from "@/lib/utils";

type Check = { id: string; group: string; label: string; status: "pass" | "warn" | "fail" | "info"; value: string; detail: string };
type Result = { url: string; score: number; checkedAt: string; checks: Check[] };

const STEPS = ["Fetching the page", "Following redirects", "Reading tags and headings", "Checking schema and links", "Looking for robots.txt and sitemap"];
const statusLabel = { pass: "Pass", warn: "Improve", fail: "Fix", info: "Info" } as const;

/** Live single-page SEO audit, backed by /api/audit. */
export function AuditTool() {
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [filter, setFilter] = useState<"all" | "fail" | "warn" | "pass">("all");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState<string | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) { setError("Enter a website address, like yourwebsite.com."); input.current?.focus(); return; }
    setBusy(true); setError(null); setResult(null); setStep(0);
    const timer = window.setInterval(() => setStep((s) => Math.min(STEPS.length - 1, s + 1)), 900);
    try {
      const res = await fetch("/api/audit", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ url }) });
      const json = await res.json();
      if (!res.ok) setError(json.error ?? "Something went wrong.");
      else { setResult(json); setFilter("all"); track("audit_tool_run", { score: json.score }); }
    } catch {
      setError("You seem to be offline. Check your connection and try again.");
    } finally {
      clearInterval(timer);
      setBusy(false);
    }
  };

  const counts = useMemo(() => {
    const c = { pass: 0, warn: 0, fail: 0, info: 0 };
    result?.checks.forEach((k) => c[k.status]++);
    return c;
  }, [result]);
  const shown = result?.checks.filter((c) => filter === "all" || c.status === filter) ?? [];
  const grade = !result ? "" : result.score >= 85 ? "Strong" : result.score >= 65 ? "Needs work" : "Weak";

  const sendReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) return setSent("Enter a valid email address.");
    const err = await submitLead({ type: "audit", email, website: result?.url });
    setSent(err ?? "Thanks. A strategist will review your site and email you a full 40-point audit.");
  };

  return (
    <div className="atool">
      <form className="audit atool-form" onSubmit={run} noValidate>
        <label htmlFor="atool-url" className="sr">Page to audit</label>
        <input ref={input} id="atool-url" type="text" inputMode="url" placeholder="yourwebsite.com" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button className="btn red" type="submit" disabled={busy}>
          {busy ? "Auditing…" : "Run free audit"} <span className="arrow" aria-hidden="true">↗</span>
        </button>
      </form>

      {busy && (
        <div className="atool-steps" role="status">
          {STEPS.map((s, i) => (
            <span key={s} className={cx(i < step && "done", i === step && "cur")}>{i < step ? "✓" : i === step ? "●" : "○"} {s}</span>
          ))}
        </div>
      )}
      {error && <p className="atool-error" role="alert">{error}</p>}

      {result && (
        <div className="atool-result">
          <div className="atool-top">
            <div className="atool-score" style={{ ["--s" as string]: result.score }}>
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="12" />
                <circle cx="60" cy="60" r="52" fill="none" stroke={result.score >= 85 ? "#2FB44B" : result.score >= 65 ? "#F2B705" : "#E8392A"} strokeWidth="12" strokeLinecap="round" strokeDasharray="327" strokeDashoffset={327 - (327 * result.score) / 100} transform="rotate(-90 60 60)" className="atool-arc" />
              </svg>
              <b>{result.score}</b>
              <span>{grade}</span>
            </div>
            <div className="atool-sum">
              <small>Audited</small>
              <a href={result.url} target="_blank" rel="noopener noreferrer nofollow">{result.url}</a>
              <div className="atool-filters" role="group" aria-label="Filter results">
                {(["all", "fail", "warn", "pass"] as const).map((f) => (
                  <button key={f} type="button" aria-pressed={filter === f} className={cx("af", f)} onClick={() => setFilter(f)}>
                    {f === "all" ? `All ${result.checks.length}` : `${statusLabel[f]} ${counts[f]}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <ul className="atool-list">
            {shown.map((c, i) => (
              <li key={c.id} className={cx("ac", c.status)} style={{ animationDelay: `${i * 40}ms` }}>
                <span className="ac-badge">{statusLabel[c.status]}</span>
                <div>
                  <div className="ac-head"><b>{c.label}</b><span className="ac-group">{c.group}</span><span className="ac-val">{c.value}</span></div>
                  <p>{c.detail}</p>
                </div>
              </li>
            ))}
          </ul>
          <form className="atool-mail" onSubmit={sendReport} noValidate>
            <p><b>Want the full picture?</b> This tool checks one page. Our free 40-point audit covers your whole site, rankings and backlinks.</p>
            <div>
              <label htmlFor="atool-email" className="sr">Email</label>
              <input id="atool-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn" type="submit">Get the full audit</button>
            </div>
            {sent && <p className="lead-note" role="status">{sent}</p>}
          </form>
          <p className="atool-fine">Checks run on the HTML our server receives. For Core Web Vitals use <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener noreferrer">PageSpeed Insights</a>. Questions? See our <Link href="/services/technical-seo">technical SEO service</Link>.</p>
        </div>
      )}
    </div>
  );
}
