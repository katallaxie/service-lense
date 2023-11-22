import { Profile, Workload } from '..'
import { v4 as uuidv4 } from 'uuid'
import type { WorkloadCreationAttributes } from '../models/workload'

const defaultOffset = 0
const defaultLimit = 5

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
  const workload = await Workload.findOne({ where: { id }, include: [Profile] })

  return workload
}

export type Pagination = {
  offset?: number
  limit?: number
}

export async function findAndCountWorkloads(params: Pagination) {
  const workloads = await Workload.findAndCountAll({
    include: [Profile],
    order: [['name', 'DESC']],
    offset: params.offset || 0,
    limit: params.limit || 0
  })

  return workloads
}
