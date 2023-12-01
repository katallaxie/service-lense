import { Environment } from './models/environment'
import { Lens } from './models/lens'
import { Profile } from './models/profile'
import { Sequelize } from 'sequelize-typescript'
import { Solution } from './models/solution'
import { Workload } from './models/workload'
import { WorkloadLens } from './models/workload-lens'
import { WorkloadEnvironment } from './models/workload-environment'
import config from './config/config'

const env = process.env.NODE_ENV || 'development'

export const sequelize = new Sequelize({
  ...config[env]
})

sequelize.addModels([
  Environment,
  Lens,
  Profile,
  Solution,
  Workload,
  WorkloadEnvironment,
  WorkloadLens
])

export {
  Workload,
  Solution,
  Profile,
  Lens,
  WorkloadLens,
  WorkloadEnvironment,
  Environment
}

export const initDB = async () => {
  await sequelize.authenticate()
  await sequelize.sync({ alter: true })
}
