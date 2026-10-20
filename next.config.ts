import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default createMDX()(nextConfig);
