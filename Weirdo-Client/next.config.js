/** @type {import('next').NextConfig} */
const nextConfig = {
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/products/products': { page: '/products/products' },
      '/products/addproduct': { page: '/products/addproduct' },
      '/products/[id]': { page: '/products/[id]' },
      // Add other pages here
    };
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", 'weirdoblob.blob.core.windows.net'],
  },
};

module.exports = nextConfig;
