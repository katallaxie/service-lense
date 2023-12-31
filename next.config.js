/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    },
    serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript']
  },
  webpack: config => {
    config.experiments.topLevelAwait = true

    if (config.name === 'server') {
      config.optimization.concatenateModules = false
    }

    return config
  }
}

module.exports = nextConfig
