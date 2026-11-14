import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  devIndicators: false,
  // Dev server only: lets a phone on the same Wi-Fi open http://<this PC's IP>:3000. Without it Next blocks its dev
  // resources for that host and the page never hydrates, so no button reacts.
  allowedDevOrigins: ["10.0.0.*"],
  images: {
    formats: ["image/avif", "image/webp"],
    // 85 looks the same as 100 on these photographs at about a third (AVIF) to a quarter (WebP) of the bytes.
    qualities: [60, 75, 85],
    // Next's default list goes up to 3840, but the photographs are at most 3024px wide: the top size only adds bytes.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    // Optimised photos stay cached for 31 days, so Vercel re-optimises and re-writes them far less often.
    // The catch: a photo replaced under the same file name keeps showing the old copy. Give new photos a new name.
    minimumCacheTTL: 2678400,
    // Media is self-hosted in /public/media — no remote image hosts are allowed.
  },
  async headers() {
    return [
      {
        // The hero videos keep their file names when replaced, so browsers keep them for a week rather than a year.
        source: "/media/hero/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
      {
        // Menus are replaced in place: browsers re-check after an hour and may show the old copy for a day meanwhile.
        source: "/menu/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
