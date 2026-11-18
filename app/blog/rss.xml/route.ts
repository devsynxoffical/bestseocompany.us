import { blogPosts } from "@/lib/pages/blog-index";
import { guidePages } from "@/lib/pages";
import { site } from "@/lib/content";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** RSS 2.0 feed of blog posts and guides. */
export function GET() {
  const items = [
    ...blogPosts.map((p) => ({ title: p.title, url: `${site.url}/blog/${p.slug}`, desc: p.excerpt, date: p.date })),
    ...guidePages.map((g) => ({ title: g.question, url: `${site.url}/guides/${g.slug}`, desc: g.answer, date: "2026-11-18" })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(site.name)} Blog</title>
<link>${site.url}/blog</link>
<atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml"/>
<description>${esc(site.description)}</description>
<language>en-us</language>
${items.map((i) => `<item><title>${esc(i.title)}</title><link>${i.url}</link><guid>${i.url}</guid><pubDate>${new Date(`${i.date}T12:00:00Z`).toUTCString()}</pubDate><description>${esc(i.desc)}</description></item>`).join("\n")}
</channel>
</rss>`;
  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
