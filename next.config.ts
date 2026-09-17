import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only. Every width is encoded on demand the first time it is asked
    // for, and AVIF took seconds per variant on the sister site before the CDN
    // had it. WebP is an order of magnitude faster for files about a quarter
    // larger, and on a site whose caches are mostly cold latency matters more.
    formats: ["image/webp"],
    // Every photograph ships in the repo under public/media, so there is no
    // remote host to allow.
    deviceSizes: [640, 828, 1080, 1600, 2560],
    minimumCacheTTL: 31536000,
  },
  poweredByHeader: false,
};

export default nextConfig;
