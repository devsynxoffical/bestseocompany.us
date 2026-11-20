import type { GuidePage, IndustryPage, ServicePage, ToolPage } from "./types";
import { industriesA } from "./industries-a";
import { industriesB } from "./industries-b";
import { industriesC } from "./industries-c";
import { industriesD } from "./industries-d";
import { services } from "./services";
import { servicesB } from "./services-b";
import { tools } from "./tools";
import { guides1 } from "./guides-1";
import { guides2 } from "./guides-2";
import { guides3 } from "./guides-3";

export const industryPages: IndustryPage[] = [...industriesA, ...industriesB, ...industriesC, ...industriesD];
export const servicePages: ServicePage[] = [...services, ...servicesB];
export const toolPages: ToolPage[] = tools;
export const guidePages: GuidePage[] = [...guides1, ...guides2, ...guides3];

export const getIndustry = (slug: string) => industryPages.find((p) => p.slug === slug);
export const getService = (slug: string) => servicePages.find((p) => p.slug === slug);
export const getTool = (slug: string) => toolPages.find((p) => p.slug === slug);
export const getGuide = (slug: string) => guidePages.find((p) => p.slug === slug);

/** Resolves an internal path like "/services/local-seo" to a display title. */
export function titleForPath(path: string): { href: string; label: string; kind: string } | null {
  const [, section, slug] = path.replace(/^\/?/, "/").split("/");
  if (section === "industries") { const p = getIndustry(slug); return p ? { href: `/industries/${slug}`, label: `${p.name} SEO`, kind: "Industry" } : null; }
  if (section === "services") { const p = getService(slug); return p ? { href: `/services/${slug}`, label: p.name, kind: "Service" } : null; }
  if (section === "tools") { const p = getTool(slug); return p ? { href: `/tools/${slug}`, label: p.name, kind: "Free tool" } : null; }
  if (section === "guides") { const p = getGuide(slug); return p ? { href: `/guides/${slug}`, label: p.question, kind: "Guide" } : null; }
  return null;
}
