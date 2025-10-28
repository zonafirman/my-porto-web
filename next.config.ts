import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Warning: Ini akan mengizinkan build lolos walau ada error ESLint.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
