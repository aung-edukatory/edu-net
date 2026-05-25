import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
	unoptimized: true,
    remotePatterns: [new URL("https://placehold.co/**")],
    domains: ["placehold.co"],
  },
};

export default nextConfig;
