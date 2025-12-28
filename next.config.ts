import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://westhors.dentin.cloud/api/:path*',
      },
    ];
  },
  images: {
    domains: ['westhors.dentin.cloud'],
  },
};

export default nextConfig;
