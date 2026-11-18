import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { policies } from "@/lib/pages/policies";
import { PolicyView } from "@/components/pages/PolicyView";

const page = policies.find((p) => p.slug === "editorial-policy")!;

export const metadata: Metadata = buildMetadata({ title: `${page.title} | Best SEO Company`, description: page.metaDescription, path: "/editorial-policy" });

export default function Page() {
  return <PolicyView page={page} />;
}
