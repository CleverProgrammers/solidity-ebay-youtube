/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['user-images.githubusercontent.com'],
  },
}

module.exports = nextConfig
