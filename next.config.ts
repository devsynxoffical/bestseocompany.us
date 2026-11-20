import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a plain static site for Hostinger (or any Apache host).
// Redirects and security headers then live in hostinger/.htaccess, and the two
// API routes are replaced by hostinger/api/*.php. See hostinger/README.md.
const isStaticExport = process.env.STATIC_EXPORT === "1";

async function redirects() {
  return [
    { source: "/tools", destination: "/tools/free-seo-tools", permanent: true },
    // Renamed to match the Semrush keyword map (2026-11-20)
    { source: "/industries/healthcare-seo", destination: "/industries/medical-seo", permanent: true },
    { source: "/industries/car-dealership-seo", destination: "/industries/car-dealer-seo", permanent: true },
  ];
}

async function headers() {
  return [
    // The *.vercel.app hostnames serve a full duplicate of the site: keep them out of search.
    { source: "/:path*", has: [{ type: "host" as const, value: "(?<sub>.*)\\.vercel\\.app" }], headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    },
  ];
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(isStaticExport ? { output: "export", images: { unoptimized: true } } : { redirects, headers }),
};

export default nextConfig;
