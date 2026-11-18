import { NextResponse } from "next/server";
import { FetchBlockedError, normalizeUrl, safeFetch } from "@/lib/server/safeFetch";
import { auditHtml, type Check } from "@/lib/server/auditHtml";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort rate limit per server instance.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 8;
}

const weight: Record<Check["status"], number> = { pass: 1, warn: 0.5, fail: 0, info: 1 };

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ error: "Too many audits in a minute. Wait a moment and try again." }, { status: 429 });

  let input = "";
  try {
    input = String((await req.json())?.url ?? "");
  } catch {
    return NextResponse.json({ error: "Send a JSON body with a url field." }, { status: 400 });
  }
  if (!input || input.length > 2000) return NextResponse.json({ error: "Enter a website address, like yourwebsite.com." }, { status: 400 });

  try {
    const url = normalizeUrl(input);
    const page = await safeFetch(url);
    const contentType = page.headers.get("content-type") ?? "";
    const checks: Check[] = [];

    checks.push({
      id: "status", group: "Indexing", label: "HTTP status",
      status: page.status === 200 ? "pass" : page.status < 400 ? "warn" : "fail",
      value: String(page.status),
      detail: page.status === 200 ? "The page loads normally." : "Pages you want to rank should return 200 OK.",
    });
    checks.push({
      id: "redirects", group: "Indexing", label: "Redirects",
      status: page.redirects.length === 0 ? "pass" : page.redirects.length === 1 ? "info" : "warn",
      value: page.redirects.length ? `${page.redirects.length} hop${page.redirects.length > 1 ? "s" : ""}` : "None",
      detail: page.redirects.length ? page.redirects.join(" · ") : "The URL resolves without redirects.",
    });
    const https = page.finalUrl.startsWith("https://");
    checks.push({
      id: "https", group: "Security", label: "HTTPS",
      status: https ? "pass" : "fail", value: https ? "Secure" : "Not secure",
      detail: https ? "The page is served over HTTPS." : "Serve the site over HTTPS and redirect HTTP to it.",
    });
    checks.push({
      id: "speed", group: "Speed", label: "Server response",
      status: page.ms < 800 ? "pass" : page.ms < 2000 ? "warn" : "fail",
      value: `${(page.ms / 1000).toFixed(2)}s`,
      detail: "Time to download the HTML from our server. For full Core Web Vitals use PageSpeed Insights.",
    });
    checks.push({
      id: "size", group: "Speed", label: "HTML size",
      status: page.bytes < 500_000 ? "pass" : page.bytes < 1_500_000 ? "warn" : "fail",
      value: `${Math.round(page.bytes / 1024)} KB`,
      detail: page.bytes < 500_000 ? "The HTML document is a reasonable size." : "Large HTML slows rendering. Look for inlined data or bloated page builders.",
    });

    if (/html/i.test(contentType) || /<html/i.test(page.body)) checks.push(...auditHtml(page.body, page.finalUrl));

    // robots.txt & sitemap
    const origin = new URL(page.finalUrl).origin;
    let robotsTxt = "", sitemapFound = false, sitemapUrl = `${origin}/sitemap.xml`;
    try {
      const r = await safeFetch(new URL("/robots.txt", origin), { timeoutMs: 5000, maxBytes: 200_000 });
      if (r.status === 200 && !/<html/i.test(r.body)) robotsTxt = r.body;
    } catch { /* ignore */ }
    const declared = robotsTxt.match(/^\s*sitemap:\s*(\S+)/im)?.[1];
    if (declared) sitemapUrl = declared;
    try {
      const s = await safeFetch(new URL(sitemapUrl), { timeoutMs: 5000, maxBytes: 300_000 });
      sitemapFound = s.status === 200 && /<(urlset|sitemapindex)/i.test(s.body);
    } catch { /* ignore */ }
    checks.push({
      id: "robots-txt", group: "Indexing", label: "robots.txt",
      status: robotsTxt ? (/^\s*disallow:\s*\/\s*$/im.test(robotsTxt) && /user-agent:\s*\*/i.test(robotsTxt) ? "warn" : "pass") : "warn",
      value: robotsTxt ? "Found" : "Not found",
      detail: robotsTxt ? (declared ? "Found, and it lists your sitemap." : "Found. Consider adding a Sitemap: line.") : "Add a robots.txt at the site root with a link to your sitemap.",
    });
    checks.push({
      id: "sitemap", group: "Indexing", label: "XML sitemap",
      status: sitemapFound ? "pass" : "warn", value: sitemapFound ? "Found" : "Not found",
      detail: sitemapFound ? `Found at ${sitemapUrl}` : "Create an XML sitemap and submit it in Google Search Console.",
    });

    const scored = checks.filter((c) => c.status !== "info");
    const score = Math.round((scored.reduce((s, c) => s + weight[c.status], 0) / Math.max(1, scored.length)) * 100);

    return NextResponse.json({ url: page.finalUrl, score, checkedAt: new Date().toISOString(), checks });
  } catch (err) {
    if (err instanceof FetchBlockedError) return NextResponse.json({ error: err.message }, { status: 400 });
    if (err instanceof Error && err.name === "AbortError") return NextResponse.json({ error: "The site took too long to respond (over 10 seconds)." }, { status: 504 });
    if (err instanceof TypeError && /Invalid URL/i.test(err.message)) return NextResponse.json({ error: "That doesn't look like a valid web address." }, { status: 400 });
    return NextResponse.json({ error: "We couldn't load that page. Check the address and that the site is online." }, { status: 502 });
  }
}
