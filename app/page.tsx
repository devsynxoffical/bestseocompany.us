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
import { GscResults } from "@/components/sections/GscResults";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Blog } from "@/components/sections/Blog";
import { Faq } from "@/components/sections/Faq";
import { UsAgency } from "@/components/sections/UsAgency";
import { Cta } from "@/components/sections/Cta";

export const metadata: Metadata = buildMetadata({
  title: "Best SEO Company in the USA | First Results in 90 Days",
  description: "US SEO agency for local, technical and AI search. Free 40-point audit in 48 hours, plans from $1,500/mo, month to month after 90 days. Get your audit.",
  path: "/",
  keywords: ["best seo company", "best seo company in the usa", "top seo company", "seo agency in usa", "seo company", "us seo agency"],
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
        <GscResults ids={["01", "09", "07"]} heading="Real results from Search Console." />
        <BeforeAfter />
        <Process />
        <Testimonials />
        <Pricing />
        <UsAgency />
        <Blog />
        <Faq />
        <Cta />
      </main>
    </>
  );
}
