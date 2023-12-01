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
  profilesId
}: WorkloadCreationAttributes) {
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

    await WorkloadEnvironment.create(
      {
        workloadId: workload.id,
        environmentId: '073ab171-70a1-4232-a64c-1479b14c43e9'
      },
      { transaction }
    )

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
