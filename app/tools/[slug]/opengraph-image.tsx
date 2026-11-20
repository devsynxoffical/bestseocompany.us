import { renderOg, ogSize } from "@/lib/og";
import { getTool, toolPages } from "@/lib/pages";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Best SEO Company";

export function generateStaticParams() {
  return toolPages.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getTool((await params).slug);
  return renderOg({ eyebrow: "Free SEO tool", title: p ? p.name : "Best SEO Company", color: p?.color });
}

export const dynamic = "force-static";
