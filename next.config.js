/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'codeflow-ai.vercel.app'],
    },
  },
  images: {
    domains: ['vercel.app'],
  },
  // Optimize for production
  swcMinify: true,
  compress: true,
}

module.exports = nextConfig
