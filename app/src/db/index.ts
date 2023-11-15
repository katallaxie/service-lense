import { Sequelize } from 'sequelize-typescript'
import { Workload } from './models/workload'
import config from './config/config'

const env = process.env.NODE_ENV || 'development'

export const sequelize = new Sequelize({
  ...config[env]
})

sequelize.addModels([Workload])

export { Workload }

export const initDB = async () => {
  await sequelize.authenticate()
  await sequelize.sync({ alter: true })
}
