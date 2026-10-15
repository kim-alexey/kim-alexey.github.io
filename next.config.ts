import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: process.env.PORTFOLIO_BASE_PATH || "" },
  ...(process.env.PORTFOLIO_BASE_PATH
    ? { basePath: process.env.PORTFOLIO_BASE_PATH }
    : {}),
};

export default config;
