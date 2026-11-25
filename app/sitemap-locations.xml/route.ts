import { site } from "@/lib/content";
import { locationPages } from "@/data/locations";

/** /sitemap-locations.xml: indexable state and city pages only (City Plan, section 4). */
export function GET() {
  const urls = [{ loc: `${site.url}/locations`, lastmod: "2026-11-25" }, ...locationPages.map((p) => ({ loc: `${site.url}/locations/${p.slug}`, lastmod: p.updated }))];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><changefreq>monthly</changefreq><priority>${u.loc.endsWith("/locations") ? "0.8" : "0.7"}</priority></url>`).join("\n")}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}

export const dynamic = "force-static";
