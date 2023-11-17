import { Workload } from '..'
import { v4 as uuidv4 } from 'uuid'
import type { WorkloadCreationAttributes } from '../models/workload'

export async function createWorkload({
  name,
  description,
  environment
}: WorkloadCreationAttributes) {
  const id = uuidv4()

  const w = new Workload({ id, name, description, environment })

  await w.validate()

  const workload = await w.save()

  return workload.dataValues
}

export async function deleteWorkload(id: string) {
  const workload = await Workload.destroy({ where: { id } })

  return workload
}

export async function findAndCountWorkloads() {
  const workloads = await Workload.findAndCountAll({
    order: [['name', 'DESC']],
    offset: 0,
    limit: 5
  })

  return workloads
}
