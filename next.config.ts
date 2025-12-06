import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/MonsterBook',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
