import { Solution, Workload } from '..'
import { v4 as uuidv4 } from 'uuid'
import type { SolutionCreationAttributes } from '../models/solution'
import { FindAndCountSolutionsSchema } from '../schemas/solutions'
import * as z from 'zod'

export async function addSolution({
  name,
  description
}: SolutionCreationAttributes) {
  const id = uuidv4()

  const s = new Solution({ id, name, description })
  await s.validate()

  const solution = await s.save()

  return solution.dataValues
}

export const findAndCountSolutions = async (
  opts: z.infer<typeof FindAndCountSolutionsSchema>
) => await Solution.findAndCountAll({ offset: opts.offset, limit: opts.limit })

export async function deleteSolution(id: string) {
  return await Solution.destroy({ where: { id } })
}

export async function getSolution(id: string) {
  return await Solution.findOne({ where: { id } })
}
