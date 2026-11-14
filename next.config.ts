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
    qualities: [60, 75, 85, 100],
    // Media is self-hosted in /public/media — no remote image hosts are allowed.
  },
};

export default nextConfig;
