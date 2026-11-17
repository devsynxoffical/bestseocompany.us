import type { Metadata, Viewport } from "next";
import { DM_Mono, Instrument_Serif, Inter, Inter_Tight } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "Best SEO Company | Rank #1 on Google. Grow for real.",
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best SEO Company | Rank #1 on Google. Grow for real.",
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#F3F2EE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const heroBuildScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('hero-build');setTimeout(function(){if(!d.dataset.heroReady)d.classList.remove('hero-build')},8000)}}catch(e){}`;

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
      <body>{children}</body>
    </html>
  );
}
