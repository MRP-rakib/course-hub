import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/student", destination: "/dashboard?role=student", permanent: false },
      { source: "/student/profile", destination: "/dashboard?role=student", permanent: false },
      { source: "/teacher", destination: "/dashboard?role=teacher", permanent: false },
      { source: "/teacher/profile", destination: "/dashboard?role=teacher", permanent: false },
      { source: "/admin", destination: "/dashboard?role=admin", permanent: false },
      { source: "/admin/profile", destination: "/dashboard?role=admin", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
