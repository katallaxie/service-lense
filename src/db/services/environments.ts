import { Environment } from '..'
import { v4 as uuidv4 } from 'uuid'
import type { EnvironmentCreationAttributes } from '../models/environment'

export type Pagination = {
  offset?: number
  limit?: number
}

export async function createEnvironment({
  name,
  description
}: EnvironmentCreationAttributes) {
  const w = new Environment({ id: uuidv4(), name, description })

  await w.validate()

  const workload = await w.save()

  return workload.dataValues
}

export const deleteEnvironment = async (id: string) =>
  await Environment.destroy({ where: { id } })

export const findCountEnvironments = async ({
  offset = 0,
  limit = 10
}: Pagination) =>
  await Environment.findAndCountAll({
    include: [],
    order: [['name', 'DESC']],
    offset,
    limit
  })
