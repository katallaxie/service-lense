/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
    serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript']
  }
}

module.exports = nextConfig
