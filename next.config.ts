import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // add links for images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
