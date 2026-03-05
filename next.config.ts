import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/brands',
        destination: 'https://glacial-stellar.vercel.app',
      },
      {
        source: '/brand/:slug*',
        destination: 'https://glacial-stellar.vercel.app/brand/:slug*',
      },
      // If you want the admin panel accessible too:
      {
        source: '/admin/:path*',
        destination: 'https://glacial-stellar.vercel.app/admin/:path*',
      },
      // Camila spa invitation rewrite
      {
        source: '/camila_spa',
        destination: '/camila_spa/index.html',
      }
    ]
  }
};

export default nextConfig;
