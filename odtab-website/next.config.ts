import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "online-drum-tab";

const nextConfig: NextConfig = {
  output: isProd ? "export" : undefined,
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "/",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
