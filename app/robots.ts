import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * Search engines and AI assistants are welcome: being crawlable by AI search
 * (ChatGPT, Perplexity, Claude, Gemini, Copilot) is part of our GEO strategy.
 * API routes are excluded from crawling.
 */
const AI_AND_SEARCH_BOTS = [
  "Googlebot", "Bingbot", "Applebot", "DuckDuckBot",
  "Google-Extended", "Applebot-Extended",
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User", "CCBot", "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_AND_SEARCH_BOTS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
