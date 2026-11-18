import type { Metadata } from "next";
import { site } from "@/lib/content";

type Opts = {
  title: string;              // full <title> (used as-is)
  description: string;
  path: string;               // canonical path, e.g. "/about"
  type?: "website" | "article";
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noindex?: boolean;
  /** Set false on routes that generate their own opengraph-image. */
  defaultImage?: boolean;
};

/**
 * One place to build page metadata: title, description, canonical, hreflang,
 * Open Graph and Twitter cards, so every page's share preview matches the page.
 * OG images come from the opengraph-image file nearest to each route.
 */
export function buildMetadata(o: Opts): Metadata {
  const url = `${site.url}${o.path === "/" ? "" : o.path}`;
  return {
    title: { absolute: o.title },
    description: o.description,
    keywords: o.keywords,
    alternates: { canonical: o.path, languages: { "en-US": url, "x-default": url } },
    openGraph: {
      type: o.type ?? "website",
      url,
      siteName: site.name,
      locale: "en_US",
      title: o.title,
      description: o.description,
      ...(o.defaultImage === false ? {} : { images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: o.title }] }),
      ...(o.type === "article" ? { publishedTime: o.publishedTime, modifiedTime: o.modifiedTime ?? o.publishedTime, tags: o.tags, authors: [`${site.name} team`] } : {}),
    },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, ...(o.defaultImage === false ? {} : { images: ["/opengraph-image"] }) },
    ...(o.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
