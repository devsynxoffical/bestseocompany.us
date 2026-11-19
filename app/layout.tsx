import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Serif, Inter, Inter_Tight } from "next/font/google";
import { site } from "@/lib/content";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Header } from "@/components/layout/Header";
import { Footer, type FooterColumns } from "@/components/layout/Footer";
import { guidePages, industryPages, servicePages, toolPages } from "@/lib/pages";
import { buildMenu } from "@/lib/pages/menu";
import { Analytics } from "@/components/Analytics";
import "./globals.css";
import "./pages.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-inter-tight", display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono", display: "swap" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Best SEO Company | US SEO Agency for Local & National Growth",
    template: "%s | Best SEO Company",
  },
  description: site.description,
  keywords: ["SEO company", "SEO agency USA", "local SEO", "technical SEO", "link building", "Google Maps SEO", "SEO services"],
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

const pick = <T extends { slug: string }>(list: T[], slugs: string[]) => slugs.map((s) => list.find((x) => x.slug === s)).filter((x): x is T => !!x);
const footerColumns: FooterColumns = {
  services: pick(servicePages, ["local-seo", "technical-seo", "link-building", "ecommerce-seo", "answer-engine-optimization", "seo-packages"]).map((p) => ({ href: `/services/${p.slug}`, label: p.name })),
  industries: pick(industryPages, ["law-firm-seo", "dental-seo", "roofing-seo", "hvac-seo", "plumber-seo", "med-spa-seo", "real-estate-seo"]).map((p) => ({ href: `/industries/${p.slug}`, label: `${p.name} SEO` })),
  tools: toolPages.map((p) => ({ href: `/tools/${p.slug}`, label: p.name })),
  guides: pick(guidePages, ["what-is-seo", "seo-cost", "best-seo-strategy", "seo-keyword-research", "track-seo-rankings"]).map((p) => ({ href: `/guides/${p.slug}`, label: p.question })),
};

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
        <Analytics />
      </body>
    </html>
  );
}
