import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";
import { Hero } from "@/components/sections/Hero";
import { Marquees } from "@/components/sections/Marquees";
import { Statement } from "@/components/sections/Statement";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { FloatingSeo } from "@/components/sections/FloatingSeo";
import { Services } from "@/components/sections/Services";
import { AboutBento } from "@/components/sections/AboutBento";
import { DashboardReel } from "@/components/sections/DashboardReel";
import { WhyUs } from "@/components/sections/WhyUs";
import { CaseStack } from "@/components/sections/CaseStack";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Blog } from "@/components/sections/Blog";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Best SEO Company | US SEO Agency for Local & National Growth",
  description: "Best SEO Company is a US SEO agency for technical SEO, local SEO, content, link building and AI search. Free 40-point audit. Month-to-month after 90 days.",
  path: "/",
  keywords: ["best seo company", "seo company", "seo agency usa", "local seo", "technical seo", "seo services"],
});

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <main id="top">
        <Hero />
        <Marquees />
        <Statement />
        <WhoWeHelp />
        <FloatingSeo />
        <Services />
        <AboutBento />
        <DashboardReel />
        <WhyUs />
        <CaseStack />
        <BeforeAfter />
        <Process />
        <Testimonials />
        <Pricing />
        <Blog />
        <Faq />
        <Cta />
      </main>
    </>
  );
}
