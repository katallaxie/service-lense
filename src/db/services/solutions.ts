import { Solution, SolutionComment } from '..'
import { v4 as uuidv4 } from 'uuid'
import type { SolutionCreationAttributes } from '../models/solution'
import {
  SolutionCommentAddSchema,
  SolutionCommentDeleteSchema,
  SolutionsGetSchema
} from '../schemas/solutions'
import { FindAndCountSolutionsSchema } from '../schemas/solutions'
import { z } from 'zod'

export async function addSolution({
  id = uuidv4(),
  title,
  body,
  description
}: SolutionCreationAttributes) {
  return await Solution.create({
    id,
    title,
    body,
    description
  })
}

export const findAndCountSolutions = async (
  opts: z.infer<typeof FindAndCountSolutionsSchema>
) => await Solution.findAndCountAll({ offset: opts.offset, limit: opts.limit })

export async function deleteSolution(id: string) {
  return await Solution.destroy({ where: { id } })
}

export const getSolution = async (opts: z.infer<typeof SolutionsGetSchema>) =>
  await Solution.findOne({ where: { id: opts }, include: [SolutionComment] })

export const addSolutionComment = async (
  opts: z.infer<typeof SolutionCommentAddSchema>
) => (await (await SolutionComment.create({ ...opts })).save()).dataValues

export const deleteSolutionComment = async (
  opts: z.infer<typeof SolutionCommentDeleteSchema>
) => SolutionComment.destroy({ where: { id: opts } })
