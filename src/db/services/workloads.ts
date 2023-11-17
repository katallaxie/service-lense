import { Workload } from '..'
import type { WorkloadCreationAttributes } from '../models/workload'

export async function createWorkload({
  name,
  description,
  environment
}: WorkloadCreationAttributes) {
  const w = new Workload({ name, description, environment })

  await w.validate()

  const workload = await w.save()

  return workload.dataValues
}

export async function findAndCountWorkloads() {
  const workloads = await Workload.findAndCountAll({
    order: [['name', 'DESC']],
    offset: 0,
    limit: 5
  })

  return workloads
}
