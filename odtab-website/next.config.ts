import type { NextConfig } from "next";

// for github pages
const repo = "online-drum-tab";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath,
  assetPrefix: assetPrefix,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
