import type { NextConfig } from "next";

const assetPrefix = process.env.AssetPrefix ?? "";

const nextConfig: NextConfig = {
  assetPrefix: assetPrefix,
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
