import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.jotform.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hbjhsemtqhrrrihgvqpn.supabase.co",
      },
    ],
  },
};

export default nextConfig;
