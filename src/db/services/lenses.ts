import { v4 as uuidv4 } from 'uuid'
import { Lens, LensPillar, LensPillarChoice, LensPillarQuestion } from '..'
import { Spec } from '@/db/schemas/spec'
import { sequelize } from '..'

export type Pagination = {
  offset?: number
  limit?: number
}

export async function addLens({
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

    return await Lens.create({
      id,
      name,
      spec: s,
      description,
      isDraft: true
    })
  })
}

export async function deleteLens(id: string) {
  return await Lens.destroy({ where: { id } })
}

export async function getLens(id: string) {
  return await Lens.findOne({
    where: { id },
    include: [{ model: LensPillar, include: [LensPillarQuestion] }]
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
