import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
	unoptimized: true,
    remotePatterns: [new URL("https://placehold.co/**")],
  },
};

export default withPayload(nextConfig);
