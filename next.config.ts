import type { NextConfig } from "next";
import { siteConfig } from "./config/site.config";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: siteConfig.urls.basePath,
  assetPrefix: siteConfig.urls.basePath ? `${siteConfig.urls.basePath}/` : "",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: siteConfig.urls.basePath,
  },
};

export default nextConfig;
