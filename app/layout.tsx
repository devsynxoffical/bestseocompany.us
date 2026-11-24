import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Serif, Inter, Inter_Tight } from "next/font/google";
import { site } from "@/lib/content";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Header } from "@/components/layout/Header";
import { Footer, type FooterColumn } from "@/components/layout/Footer";
import { industryPages } from "@/lib/pages";
import { buildMenu } from "@/lib/pages/menu";
import { Analytics } from "@/components/Analytics";
import { StickyCta } from "@/components/layout/StickyCta";
import "./globals.css";
import "./pages.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-inter-tight", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Best SEO Company in the USA | First Results in 90 Days",
    template: "%s | Best SEO Company",
  },
  description: site.description,
  keywords: ["best SEO company", "SEO company", "SEO agency in USA"],
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary_large_image" },
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Search engine optimization",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 } },
  verification: { google: "QoSGCguAm1Ze0nUWQr1YV5U1W8jmmlgnQkVCUMCRQ4M" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const heroBuildScript = `try{if(location.pathname==='/'&&!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('hero-build');setTimeout(function(){if(!d.dataset.heroReady)d.classList.remove('hero-build')},8000)}}catch(e){}`;

const svcLink = (slug: string, label: string) => ({ href: `/services/${slug}`, label });
const indLink = (slug: string, label: string) => ({ href: `/industries/${slug}`, label });
// Short labels so every link fits on one line; industry anchors use the mapped keywords.
const footerColumns: FooterColumn[] = [
  { title: "Services", links: [svcLink("local-seo", "Local SEO"), svcLink("technical-seo", "Technical SEO"), svcLink("ecommerce-seo", "Ecommerce SEO"), svcLink("link-building", "Link building"), svcLink("answer-engine-optimization", "AI search (AEO)"), svcLink("white-label-seo", "White label SEO")], more: { href: "/services", label: "All services" } },
  { title: "Industries", links: [indLink("dental-seo", "SEO for dentists"), indLink("law-firm-seo", "SEO for lawyers"), indLink("plumber-seo", "SEO for plumbers"), indLink("roofing-seo", "SEO for roofers"), indLink("contractor-seo", "SEO for contractors"), indLink("medical-seo", "SEO for doctors")], more: { href: "/industries", label: `All ${industryPages.length} industries` } },
  { title: "Free tools", links: [{ href: "/tools/seo-audit-tool", label: "SEO audit tool" }, { href: "/tools/backlink-checker", label: "Backlink checker" }, { href: "/tools/website-traffic-checker", label: "Traffic checker" }, { href: "/tools/seo-rank-checker", label: "Rank checker" }], more: { href: "/tools/free-seo-tools", label: "All free tools" } },
  { title: "Resources", links: [{ href: "/blog", label: "Blog" }, { href: "/guides/what-is-seo", label: "What is SEO?" }, { href: "/guides/seo-cost", label: "SEO cost" }, { href: "/guides/seo-keyword-research", label: "Keyword research" }, { href: "/guides/track-seo-rankings", label: "Track rankings" }], more: { href: "/guides", label: "All guides" } },
  { title: "Company", links: [{ href: "/about", label: "About us" }, { href: "/pricing", label: "Pricing" }, { href: "/free-seo-audit", label: "Free SEO audit" }, { href: "/results", label: "Results" }, { href: "/contact", label: "Contact" }] },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`${inter.variable} ${interTight.variable} ${dmMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Hide hero layers before first paint so the "built by agents" intro can play.
            Falls back to the plain hero if the app hasn't hydrated within 8 seconds. */}
        <script dangerouslySetInnerHTML={{ __html: heroBuildScript }} />
      </head>
      <body>
        <ScrollProgress />
        <CustomCursor />
        <Header menu={buildMenu()} />
        {children}
        <Footer columns={footerColumns} />
        <StickyCta />
        <Analytics />
      </body>
    </html>
  );
}
