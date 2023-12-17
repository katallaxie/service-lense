import { v4 as uuidv4 } from 'uuid'
import {
  Lens,
  LensPillar,
  LensPillarChoice,
  LensPillarQuestion,
  LensPillarQuestionRisk
} from '..'
import { Spec } from '@/db/schemas/spec'
import {
  LensesGetSchema,
  LensesDeleteSchema,
  LensesPublishSchema
} from '../schemas/lenses'
import { sequelize } from '..'
import { z } from 'zod'

export type Pagination = {
  offset?: number
  limit?: number
}

export const getLens = async (opts: z.infer<typeof LensesGetSchema>) =>
  await Lens.findOne({
    where: { id: opts },
    include: [{ model: LensPillar, include: [{ model: LensPillarQuestion }] }]
  })

export const deleteLens = async (opts: z.infer<typeof LensesDeleteSchema>) =>
  await Lens.destroy({
    where: { id: opts }
  })

export const publishLens = async (opts: z.infer<typeof LensesPublishSchema>) =>
  await Lens.update({ isDraft: false }, { where: { id: opts } })

export async function createLens({
  id = uuidv4(),
  name,
  description,
  spec
}: {
  id: string
  name: string
  description: string
  spec: string
}) {
  return await sequelize.transaction(async transaction => {
    const s = await Spec.parseAsync(JSON.parse(spec))

    const lens = await Lens.create(
      {
        id,
        name,
        version: s.version,
        description,
        spec: s,
        isDraft: true
      },
      {
        transaction
      }
    )

    const pillars = await LensPillar.bulkCreate(
      [
        ...s.pillars.map(pillar => ({
          lensId: lens.id,
          name: pillar.name,
          ref: pillar.id,
          description: pillar.description,
          questions: []
        }))
      ],
      { transaction }
    )

    const questions = await LensPillarQuestion.bulkCreate(
      pillars.flatMap((pillar, idx) => [
        ...s.pillars[idx].questions.map(question => {
          return {
            pillarId: pillar.id,
            ref: question.id,
            name: question.title,
            description: question.description
          }
        })
      ]),
      { transaction }
    )

    const choices = await LensPillarChoice.bulkCreate(
      pillars.flatMap((pillar, a) => [
        ...questions.flatMap((question, b) => [
          ...s.pillars[a].questions[b].choices.map(choice => {
            return {
              ref: choice.id,
              name: choice.title
            }
          })
        ])
      ])
    )

    // const questions = await LensPillarQuestion.bulkCreate(
    //   pillars.forEach(pillar => pillar.questions?.map(question => ({
    //     name: question.
    //   })))
    // )

    return { ...lens.dataValues }
  })
}

export async function getQuestion(questionId: string) {
  return await LensPillarQuestion.findOne({
    include: [{ model: LensPillarChoice }],
    where: { id: questionId }
  })
}

export async function findAndCountLenses({
  offset = 0,
  limit = 10
}: Pagination) {
  const lenses = await Lens.findAndCountAll({
    order: [['name', 'DESC']],
    offset,
    limit
  })

  return lenses
}
