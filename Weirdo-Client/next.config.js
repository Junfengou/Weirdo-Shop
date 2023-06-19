/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", 'weirdoblob.blob.core.windows.net'],
  },
};

module.exports = nextConfig;
