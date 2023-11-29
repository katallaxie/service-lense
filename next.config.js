/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'sequelize',
      'sequelize-typescript',
      '@trpc/server'
    ]
  }
}

module.exports = nextConfig
