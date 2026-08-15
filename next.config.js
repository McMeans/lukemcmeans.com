const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Home directory has an unrelated package-lock.json (mongodb). Pin tracing
  // to this app so Next does not treat ~ as the workspace root.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async redirects() {
    return [
      {
        source: '/charlottesville-top8s',
        destination: 'https://charlottesville-top8s.fly.dev/',
        permanent: true,
      },
      {
        source: '/top8s',
        destination: 'https://charlottesville-top8s.fly.dev/',
        permanent: true,
      },
      {
        source: '/cville-top8s',
        destination: 'https://charlottesville-top8s.fly.dev/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
