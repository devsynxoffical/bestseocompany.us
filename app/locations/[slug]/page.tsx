import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getLocation, locationPages } from "@/data/locations";
import { LocationView } from "@/components/pages/LocationView";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locationPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getLocation((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.metaDescription, path: `/locations/${p.slug}`, keywords: [p.keyword, `seo agency ${p.name.toLowerCase()}`, `${p.name.toLowerCase()} seo services`] });
}

export default async function LocationPageView({ params }: Params) {
  const p = getLocation((await params).slug);
  if (!p) notFound();
  return <LocationView p={p} />;
}
