import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // The dev-only "N" badge overlapped the mobile nav bar.
  devIndicators: false,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
