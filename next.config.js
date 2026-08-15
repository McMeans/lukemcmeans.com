/** @type {import('next').NextConfig} */
const nextConfig = {
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
