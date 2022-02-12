/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ["images.pokemontcg.io"],
  },
};

module.exports = nextConfig;
