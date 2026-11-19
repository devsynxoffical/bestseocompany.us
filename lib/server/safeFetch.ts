import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

/**
 * Fetch helper for user-supplied URLs (SEO audit tool).
 * Guards against SSRF: only http(s), no credentials, no private/loopback/link-local
 * addresses (checked on every redirect hop), size and time limits.
 */

const MAX_REDIRECTS = 5;

function isPrivateIPv4(ip: string) {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 0 || a === 10 || a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) ||
    a >= 224
  );
}

function isPrivateIPv6(ip: string) {
  const v = ip.toLowerCase();
  if (v === "::1" || v === "::") return true;
  if (v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe8") || v.startsWith("fe9") || v.startsWith("fea") || v.startsWith("feb")) return true;
  const mapped = v.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  return mapped ? isPrivateIPv4(mapped[1]) : false;
}

export class FetchBlockedError extends Error {}

export function normalizeUrl(input: string): URL {
  let raw = input.trim();
  if (!/^https?:\/\//i.test(raw)) raw = `https://${raw}`;
  const url = new URL(raw);
  if (!["http:", "https:"].includes(url.protocol)) throw new FetchBlockedError("Only http and https URLs can be audited.");
  if (url.username || url.password) throw new FetchBlockedError("URLs with credentials can't be audited.");
  if (url.port && !["80", "443"].includes(url.port)) throw new FetchBlockedError("Only standard ports (80 and 443) can be audited.");
  if (!url.hostname.includes(".") || url.hostname.endsWith(".local") || url.hostname.endsWith(".internal")) {
    throw new FetchBlockedError("Enter a public website address, like yourwebsite.com.");
  }
  return url;
}

async function assertPublicHost(hostname: string) {
  const host = hostname.replace(/^\[|\]$/g, "");
  const addresses = isIP(host) ? [{ address: host, family: isIP(host) }] : await lookup(host, { all: true });
  if (!addresses.length) throw new FetchBlockedError("That domain doesn't resolve.");
  for (const a of addresses) {
    if ((a.family === 4 && isPrivateIPv4(a.address)) || (a.family === 6 && isPrivateIPv6(a.address))) {
      throw new FetchBlockedError("That address points to a private network and can't be audited.");
    }
  }
}

export type SafeResponse = {
  finalUrl: string;
  status: number;
  redirects: string[];
  headers: Headers;
  body: string;
  bytes: number;
  ms: number;
};

export async function safeFetch(input: URL, { timeoutMs = 10000, maxBytes = 3_000_000 } = {}): Promise<SafeResponse> {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const redirects: string[] = [];
  let url = input;

  try {
    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      await assertPublicHost(url.hostname);
      const res = await fetch(url, {
        redirect: "manual",
        signal: controller.signal,
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; BestSEOCompanyAuditBot/1.0; +https://www.bestseocompany.us/tools/seo-audit-tool)",
          accept: "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
        },
      });

      if (res.status >= 300 && res.status < 400 && res.headers.get("location")) {
        const next = new URL(res.headers.get("location")!, url);
        if (!["http:", "https:"].includes(next.protocol)) throw new FetchBlockedError("Redirected to an unsupported URL.");
        redirects.push(`${res.status} → ${next.toString()}`);
        url = next;
        continue;
      }

      // Read the body with a size cap.
      const reader = res.body?.getReader();
      const chunks: Uint8Array[] = [];
      let bytes = 0;
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > maxBytes) { await reader.cancel(); break; }
          chunks.push(value);
        }
      }
      const body = new TextDecoder("utf-8", { fatal: false }).decode(Buffer.concat(chunks.map((c) => Buffer.from(c))));
      return { finalUrl: url.toString(), status: res.status, redirects, headers: res.headers, body, bytes, ms: Date.now() - started };
    }
    throw new FetchBlockedError("Too many redirects.");
  } finally {
    clearTimeout(timer);
  }
}
