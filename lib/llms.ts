import { site, plans } from "@/lib/content";
import { guidePages, industryPages, servicePages, toolPages } from "@/lib/pages";
import { blogPosts } from "@/lib/pages/blog-index";
import { industryCategories } from "@/lib/pages/categories";
import type { GuideSection } from "@/lib/pages/types";

const u = (p: string) => `${site.url}${p}`;
const first = (s: string) => s.split(". ")[0].replace(/\.$/, "") + ".";

/** llms.txt: a concise, link-first map of the site for AI assistants (llmstxt.org format). */
export function buildLlmsTxt() {
  const lines: string[] = [];
  lines.push(`# ${site.name}`, "", `> ${site.description}`, "");
  lines.push(
    "Key facts:",
    `- Name: ${site.name} (${site.domain})`,
    "- Type: US-based search engine optimization (SEO) agency serving US businesses",
    "- Services: technical SEO, local SEO and Google Business Profile, content, link building and digital PR, e-commerce and Shopify SEO, answer engine optimization (AEO) and generative engine optimization (GEO)",
    `- Pricing: ${plans.map((p) => `${p.name} ${p.monthly ? `$${p.monthly.toLocaleString("en-US")}/month` : "custom"}`).join(", ")}; month to month after a 90-day starting term; 15% off when billed yearly`,
    "- Free offers: 40-point SEO audit and a live single-page SEO audit tool",
    `- Contact: ${site.email}`,
    "",
  );
  lines.push("## Company", `- [About](${u("/about")}): who we are and how we work`, `- [Pricing](${u("/pricing")}): plans and comparison`, `- [Free SEO audit](${u("/free-seo-audit")}): what the 40-point audit covers`, `- [Contact](${u("/contact")})`, `- [Editorial policy](${u("/editorial-policy")}): how we research and write`, "");
  lines.push("## Services", ...servicePages.map((p) => `- [${p.name}](${u(`/services/${p.slug}`)}): ${first(p.intro)}`), "");
  lines.push("## Industries");
  for (const c of industryCategories) {
    for (const s of c.slugs) {
      const p = industryPages.find((x) => x.slug === s);
      if (p) lines.push(`- [${p.name} SEO](${u(`/industries/${s}`)}): SEO for ${p.audience}. ${first(p.intro)}`);
    }
  }
  lines.push("", "## Free tools", ...toolPages.map((p) => `- [${p.name}](${u(`/tools/${p.slug}`)}): ${first(p.intro)}`), "");
  lines.push("## Guides", ...guidePages.map((p) => `- [${p.question}](${u(`/guides/${p.slug}`)}): ${p.answer}`), "");
  lines.push("## Blog", ...blogPosts.map((p) => `- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.excerpt}`), "");
  lines.push("## Optional", `- [Full content for LLMs](${u("/llms-full.txt")}): every guide, blog post, service and industry page as plain text`, `- [XML sitemap](${u("/sitemap.xml")})`, "");
  return lines.join("\n");
}

const sec = (s: GuideSection) =>
  [`### ${s.heading}`, ...s.paragraphs, ...(s.bullets ?? []).map((b) => `- ${b}`),
    ...(s.table ? [`| ${s.table.head.join(" | ")} |`, `| ${s.table.head.map(() => "---").join(" | ")} |`, ...s.table.rows.map((r) => `| ${r.join(" | ")} |`)] : [])].join("\n\n");

/** llms-full.txt: the full text of the site's main content in Markdown. */
export function buildLlmsFullTxt() {
  const out: string[] = [buildLlmsTxt(), "---", ""];
  for (const g of guidePages) {
    out.push(`## ${g.question}`, `URL: ${u(`/guides/${g.slug}`)}`, "", `**Short answer:** ${g.answer}`, "", ...g.keyTakeaways.map((t) => `- ${t}`), "", ...g.sections.map(sec), "", ...g.faqs.map((f) => `**${f.q}** ${f.a}`), "", "---", "");
  }
  for (const b of blogPosts) {
    out.push(`## ${b.title}`, `URL: ${u(`/blog/${b.slug}`)} (published ${b.date})`, "", `**In short:** ${b.answer}`, "", ...b.sections.map(sec), "", ...b.faqs.map((f) => `**${f.q}** ${f.a}`), "", "---", "");
  }
  for (const s of servicePages) {
    out.push(`## ${s.name}`, `URL: ${u(`/services/${s.slug}`)}`, "", s.intro, "", ...s.whatItIs, "", "Deliverables:", ...s.deliverables.map((d) => `- ${d.title}: ${d.body}`), "", ...s.faqs.map((f) => `**${f.q}** ${f.a}`), "", "---", "");
  }
  for (const p of industryPages) {
    out.push(`## ${p.name} SEO`, `URL: ${u(`/industries/${p.slug}`)}`, "", p.intro, "", "Challenges:", ...p.challenges.map((c) => `- ${c.title}: ${c.body}`), "", "Approach:", ...p.playbook.map((c, i) => `${i + 1}. ${c.title}: ${c.body}`), "", ...(p.compliance ? [`Compliance note: ${p.compliance}`, ""] : []), ...p.faqs.map((f) => `**${f.q}** ${f.a}`), "", "---", "");
  }
  return out.join("\n");
}
