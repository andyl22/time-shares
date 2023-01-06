/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com', 'localhost']
  }
};

// eslint-disable-next-line no-undef
module.exports = nextConfig;
