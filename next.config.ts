import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/tools", destination: "/tools/free-seo-tools", permanent: true },
      // Renamed to match the Semrush keyword map (2026-11-20)
      { source: "/industries/healthcare-seo", destination: "/industries/medical-seo", permanent: true },
      { source: "/industries/car-dealership-seo", destination: "/industries/car-dealer-seo", permanent: true },
    ];
  },
  async headers() {
    return [
      // The *.vercel.app hostnames serve a full duplicate of the site: keep them out of search.
      { source: "/:path*", has: [{ type: "host", value: "(?<sub>.*)\\.vercel\\.app" }], headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
