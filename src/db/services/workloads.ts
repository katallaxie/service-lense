import { Profile, Workload, Lens, WorkloadLens } from '..'
import { v4 as uuidv4 } from 'uuid'
import type { WorkloadCreationAttributes } from '../models/workload'

export async function createWorkload({
  name,
  description,
  environment,
  profilesId
}: WorkloadCreationAttributes) {
  const id = uuidv4()
  const w = new Workload({ id, profilesId, name, description, environment })

  await w.validate()

  const workload = await w.save()

  return workload.dataValues
}

export async function deleteWorkload(id: string) {
  const workload = await Workload.destroy({ where: { id } })

  return workload
}

export async function getWorkload(id: string) {
  const workload = await Workload.findOne({
    where: { id },
    include: [Profile, Lens]
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
    include: [Profile, Lens],
    order: [['name', 'DESC']],
    offset,
    limit
  })

  return workloads
}
