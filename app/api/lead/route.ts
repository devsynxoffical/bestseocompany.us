import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Receives every form on the site (free audit, report requests, newsletter).
 * Set LEAD_WEBHOOK_URL in Vercel (e.g. a Zapier, Make, Slack or CRM webhook)
 * to forward submissions. Without it, leads are written to the server log.
 */

const TYPES = ["audit", "backlink-report", "traffic-report", "rank-report", "newsletter", "contact"] as const;

const clean = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(data.company_url)) return NextResponse.json({ ok: true });

  const type = TYPES.includes(data.type as (typeof TYPES)[number]) ? (data.type as string) : "contact";
  const lead = {
    type,
    email: clean(data.email, 200),
    website: clean(data.website, 300),
    name: clean(data.name, 120),
    keywords: clean(data.keywords, 600),
    location: clean(data.location, 120),
    page: clean(data.page, 300),
    receivedAt: new Date().toISOString(),
  };

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!lead.email && !lead.website) {
    return NextResponse.json({ error: "Enter your website or email." }, { status: 400 });
  }

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      const res = await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(lead) });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[lead] webhook failed", err, lead);
      return NextResponse.json({ error: "We couldn't send that right now. Please email us instead." }, { status: 502 });
    }
  } else {
    console.log("[lead] LEAD_WEBHOOK_URL not set; lead received:", JSON.stringify(lead));
  }

  return NextResponse.json({ ok: true });
}
