/**
 * Lightweight on-page SEO checks on raw HTML. Regex-based on purpose:
 * no extra dependencies, fast, and good enough for a single-page audit.
 */

export type CheckStatus = "pass" | "warn" | "fail" | "info";
export type Check = { id: string; group: string; label: string; status: CheckStatus; value: string; detail: string };

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, " ").trim();

const attr = (tag: string, name: string) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? decode(m[2] ?? m[3] ?? m[4] ?? "") : null;
};

const metaContent = (html: string, key: string, by: "name" | "property" = "name") => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  for (const t of tags) if ((attr(t, by) ?? "").toLowerCase() === key) return attr(t, "content");
  return null;
};

const stripTags = (s: string) => decode(s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));

export function auditHtml(html: string, pageUrl: string): Check[] {
  const checks: Check[] = [];
  const add = (c: Check) => checks.push(c);
  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? html;
  const bodyHtml = (html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? html)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");

  // Title
  const title = stripTags(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  add({
    id: "title", group: "Content", label: "Title tag",
    status: !title ? "fail" : title.length < 25 || title.length > 65 ? "warn" : "pass",
    value: title ? `${title.length} characters` : "Missing",
    detail: !title ? "Add a unique title that names the page topic and your brand." : `"${title}". Aim for roughly 30–60 characters so it isn't cut off in results.`,
  });

  // Meta description
  const desc = metaContent(head, "description");
  add({
    id: "description", group: "Content", label: "Meta description",
    status: !desc ? "fail" : desc.length < 70 || desc.length > 165 ? "warn" : "pass",
    value: desc ? `${desc.length} characters` : "Missing",
    detail: desc ? `"${desc.slice(0, 180)}". Aim for about 120–160 characters that sell the click.` : "Write a short summary that tells searchers why to click. Google may still rewrite it.",
  });

  // Headings
  const h1s = (bodyHtml.match(/<h1\b[\s\S]*?<\/h1>/gi) ?? []).map(stripTags).filter(Boolean);
  add({
    id: "h1", group: "Content", label: "H1 heading",
    status: h1s.length === 1 ? "pass" : h1s.length === 0 ? "fail" : "warn",
    value: `${h1s.length} found`,
    detail: h1s.length ? `"${h1s[0].slice(0, 120)}"${h1s.length > 1 ? ` plus ${h1s.length - 1} more. Use one clear H1 per page.` : "."}` : "Add one H1 that states what the page is about.",
  });
  const h2 = (bodyHtml.match(/<h2\b/gi) ?? []).length, h3 = (bodyHtml.match(/<h3\b/gi) ?? []).length;
  add({
    id: "headings", group: "Content", label: "Heading structure",
    status: h2 > 0 ? "pass" : "warn", value: `${h2} H2 · ${h3} H3`,
    detail: h2 > 0 ? "Subheadings break the page into scannable sections." : "Add H2 subheadings so readers and search engines can follow the structure.",
  });

  // Word count
  const words = stripTags(bodyHtml).split(" ").filter((w) => /[a-z0-9]/i.test(w)).length;
  add({
    id: "words", group: "Content", label: "Text content",
    status: words >= 300 ? "pass" : words >= 120 ? "warn" : "fail", value: `${words.toLocaleString("en-US")} words`,
    detail: words >= 300 ? "There's enough text for search engines to understand the page." : "Thin pages struggle to rank. Explain the service, who it's for, location and FAQs.",
  });

  // Images alt
  const imgs = bodyHtml.match(/<img\b[^>]*>/gi) ?? [];
  const missingAlt = imgs.filter((t) => attr(t, "alt") === null).length;
  add({
    id: "alt", group: "Content", label: "Image alt text",
    status: imgs.length === 0 ? "info" : missingAlt === 0 ? "pass" : missingAlt / imgs.length > 0.3 ? "fail" : "warn",
    value: imgs.length ? `${imgs.length - missingAlt}/${imgs.length} have alt` : "No images",
    detail: missingAlt ? `${missingAlt} image${missingAlt > 1 ? "s are" : " is"} missing an alt attribute. Describe meaningful images; use alt="" for decorative ones.` : "Alt text helps accessibility and image search.",
  });

  // Links
  const host = new URL(pageUrl).hostname.replace(/^www\./, "");
  let internal = 0, external = 0;
  for (const t of bodyHtml.match(/<a\b[^>]*>/gi) ?? []) {
    const href = attr(t, "href");
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript):/i.test(href)) continue;
    try { (new URL(href, pageUrl).hostname.replace(/^www\./, "") === host ? internal++ : external++); } catch { /* ignore */ }
  }
  add({
    id: "links", group: "Content", label: "Links",
    status: internal >= 3 ? "pass" : "warn", value: `${internal} internal · ${external} external`,
    detail: internal >= 3 ? "Internal links help search engines discover and rank your other pages." : "Link to your key service and location pages from here.",
  });

  // Canonical
  const canonTag = (head.match(/<link\b[^>]*>/gi) ?? []).find((t) => (attr(t, "rel") ?? "").toLowerCase() === "canonical");
  const canonical = canonTag ? attr(canonTag, "href") : null;
  add({
    id: "canonical", group: "Indexing", label: "Canonical tag",
    status: canonical ? "pass" : "warn", value: canonical ? "Present" : "Missing",
    detail: canonical ? `Points to ${canonical}` : "Add a self-referencing canonical to avoid duplicate-URL issues.",
  });

  // Robots meta
  const robots = (metaContent(head, "robots") ?? "").toLowerCase();
  add({
    id: "robots-meta", group: "Indexing", label: "Meta robots",
    status: robots.includes("noindex") ? "fail" : "pass", value: robots || "Not set (indexable)",
    detail: robots.includes("noindex") ? "This page tells search engines not to index it. Remove noindex if it should rank." : "The page can be indexed.",
  });

  // Viewport & lang
  const viewport = metaContent(head, "viewport");
  add({
    id: "viewport", group: "Mobile", label: "Mobile viewport",
    status: viewport ? "pass" : "fail", value: viewport ? "Present" : "Missing",
    detail: viewport ? "The page is set up for mobile screens." : "Add <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">. Google indexes the mobile version first.",
  });
  const lang = attr(html.match(/<html\b[^>]*>/i)?.[0] ?? "", "lang");
  add({
    id: "lang", group: "Mobile", label: "Language attribute",
    status: lang ? "pass" : "warn", value: lang ?? "Missing",
    detail: lang ? "Declares the page language for browsers and assistive tech." : "Add lang=\"en\" (or en-US) to the <html> tag.",
  });

  // Open Graph
  const og = ["og:title", "og:description", "og:image"].filter((p) => metaContent(head, p, "property"));
  add({
    id: "og", group: "Sharing", label: "Open Graph tags",
    status: og.length === 3 ? "pass" : og.length ? "warn" : "fail", value: `${og.length}/3 found`,
    detail: og.length === 3 ? "Links to this page will show a proper title, description and image when shared." : "Add og:title, og:description and og:image so shared links look right.",
  });

  // Structured data
  const types = new Set<string>();
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const walk = (n: unknown) => {
        if (Array.isArray(n)) n.forEach(walk);
        else if (n && typeof n === "object") {
          const o = n as Record<string, unknown>;
          const t = o["@type"];
          if (typeof t === "string") types.add(t);
          if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && types.add(x));
          if (o["@graph"]) walk(o["@graph"]);
        }
      };
      walk(JSON.parse(m[1]));
    } catch { types.add("Invalid JSON-LD"); }
  }
  add({
    id: "schema", group: "Structured data", label: "Structured data (JSON-LD)",
    status: types.has("Invalid JSON-LD") ? "fail" : types.size ? "pass" : "warn",
    value: types.size ? [...types].slice(0, 6).join(", ") : "None found",
    detail: types.size ? "Schema helps search engines and AI assistants understand your business." : "Add Organization or LocalBusiness schema, plus FAQ or Product where relevant.",
  });

  return checks;
}
