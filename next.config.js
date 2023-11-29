/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sequelize', '@trpc/server']
  }
}

module.exports = nextConfig
