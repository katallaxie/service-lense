import { Sequelize } from 'sequelize-typescript'
import { Workload } from './models/workload'
import { Profile } from './models/profile'
import { Solution } from './models/solution'
import { Lens } from './models/lens'
import config from './config/config'

const env = process.env.NODE_ENV || 'development'

export const sequelize = new Sequelize({
  ...config[env]
})

sequelize.addModels([Workload, Solution, Profile, Lens])

export { Workload, Solution, Profile, Lens }

export const initDB = async () => {
  await sequelize.authenticate()
  await sequelize.sync({ alter: true })
}
