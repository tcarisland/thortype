/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  staticPageGenerationTimeout: 120,
  images: {
    loader: 'akamai',
    path: '.',
  }
}

module.exports = nextConfig
