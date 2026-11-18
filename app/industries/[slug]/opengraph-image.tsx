import { renderOg, ogSize } from "@/lib/og";
import { getIndustry, industryPages } from "@/lib/pages";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Best SEO Company";

export function generateStaticParams() {
  return industryPages.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getIndustry((await params).slug);
  return renderOg({ eyebrow: "Industry SEO", title: p ? `${p.name} SEO` : "Best SEO Company", color: p?.color });
}
