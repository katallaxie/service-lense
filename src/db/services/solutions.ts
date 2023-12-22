import {
  Solution,
  SolutionComment,
  SolutionTemplate,
  User,
  sequelize
} from '..'
import { v4 as uuidv4 } from 'uuid'
import type { SolutionCreationAttributes } from '../models/solution'
import {
  SolutionCommentAddSchema,
  SolutionCommentDeleteSchema,
  SolutionsGetSchema,
  FindAndCountSolutionsSchema,
  FindAndCountSolutionTemplates,
  FindOneSolutionTemplate,
  DestroySolutionSchema,
  DestroySolutionTemplateSchema,
  MakeCopySolutionTemplateSchema
} from '../schemas/solutions'
import { z } from 'zod'

export const countSolutions = async () => await Solution.count()

export async function addSolution({
  id = uuidv4(),
  userId,
  title,
  body,
  description
}: SolutionCreationAttributes) {
  return await Solution.create({
    id,
    title,
    body,
    description,
    userId
  })
}

export const findAndCountSolutions = async (
  opts: z.infer<typeof FindAndCountSolutionsSchema>
) => await Solution.findAndCountAll({ offset: opts.offset, limit: opts.limit })

export async function deleteSolution(
  opts: z.infer<typeof DestroySolutionSchema>
) {
  return await Solution.destroy({ where: { id: opts } })
}

export const getSolution = async (opts: z.infer<typeof SolutionsGetSchema>) =>
  await Solution.findOne({
    where: { id: opts },
    include: [
      { model: User },
      { model: SolutionComment, include: [{ model: User }] }
    ]
  })

export const addSolutionComment = async (
  opts: z.infer<typeof SolutionCommentAddSchema>
) => (await (await SolutionComment.create({ ...opts })).save()).dataValues

export const deleteSolutionComment = async (
  opts: z.infer<typeof SolutionCommentDeleteSchema>
) => SolutionComment.destroy({ where: { id: opts } })

export const findAndCountSolutionTemplates = async (
  opts: z.infer<typeof FindAndCountSolutionTemplates>
) =>
  await SolutionTemplate.findAndCountAll({
    offset: opts.offset,
    limit: opts.limit
  })

export const destroySolutionTemplate = async (
  opts: z.infer<typeof DestroySolutionTemplateSchema>
) => await SolutionTemplate.destroy({ where: { id: opts } })

export const findOneSolutionTemplate = async (
  opts: z.infer<typeof FindOneSolutionTemplate>
) =>
  await SolutionTemplate.findOne({
    where: { id: opts }
  })

export const makeCopySolutionTemplate = async (
  opts: z.infer<typeof MakeCopySolutionTemplateSchema>
) =>
  sequelize.transaction(async transaction => {
    const tmpl = await SolutionTemplate.findOne({ where: { id: opts } })

    return SolutionTemplate.create(
      {
        title: `${tmpl?.title} (Copy)`,
        body: tmpl?.body,
        description: tmpl?.description
      },
      { transaction }
    )
  })
