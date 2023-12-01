import {
  Profile,
  Workload,
  Lens,
  WorkloadLens,
  WorkloadEnvironment,
  Environment
} from '..'
import { v4 as uuidv4 } from 'uuid'
import type { WorkloadCreationAttributes } from '../models/workload'
import { sequelize } from '..'

export async function createWorkload({
  name,
  description,
  environments,
  profilesId,
  environmentsIds
}: WorkloadCreationAttributes & { environmentsIds: string[] }) {
  return await sequelize.transaction(async transaction => {
    const id = uuidv4()
    const workload = await Workload.create(
      {
        id,
        profilesId,
        name,
        environments,
        description
      },
      { transaction }
    )

    const items = Array.from(environmentsIds).map(id => ({
      environmentId: id,
      workloadId: workload.id
    }))
    await WorkloadEnvironment.bulkCreate(items, { transaction })

    return workload.dataValues
  })
}

export async function getWorkload(id: string) {
  const workload = await Workload.findOne({
    where: { id },
    include: [Profile, Environment]
  })

  return workload
}

export type Pagination = {
  offset?: number
  limit?: number
}

export async function findAndCountWorkloads({
  offset = 0,
  limit = 10
}: Pagination) {
  const workloads = await Workload.findAndCountAll({
    include: [Profile, Environment],
    order: [['name', 'DESC']],
    offset,
    limit
  })

  return workloads
}
