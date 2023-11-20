import { Solution } from '..'
import { v4 as uuidv4 } from 'uuid'
import type { SolutionCreationAttributes } from '../models/solution'

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

export async function deleteSolution(id: string) {
  return await Solution.destroy({ where: { id } })
}

export async function getSolution(id: string) {
  return await Solution.findOne({ where: { id } })
}
