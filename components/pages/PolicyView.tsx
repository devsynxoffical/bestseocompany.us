import type { PolicyPage } from "@/lib/pages/types";
import { breadcrumbSchema } from "@/lib/pages/schema";
import { JsonLd } from "./JsonLd";
import { PageHero } from "./PageHero";
import { ArticleBody } from "./ArticleBody";
import { formatDate } from "@/lib/pages/blog-index";

export function PolicyView({ page }: { page: PolicyPage }) {
  const crumbs = [{ name: "Home", path: "/" }, { name: page.title, path: `/${page.slug}` }];
  return (
    <main>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero crumbs={crumbs} eyebrow={`Last updated ${formatDate(page.updated)}`} h1={page.title} intro={page.intro} color="taupe" wide />
      <div className="policy">
        <ArticleBody takeaways={[`Questions? Email hello@bestseocompany.us.`, `Last updated ${formatDate(page.updated)}.`]} sections={page.sections} />
      </div>
    </main>
  );
}
