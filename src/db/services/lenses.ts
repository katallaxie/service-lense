import { v4 as uuidv4 } from 'uuid'
import { Lens, LensPillar, LensPillarQuestion } from '..'

export type Pagination = {
  offset?: number
  limit?: number
}

export async function addLens({
  name,
  description,
  spec
}: {
  name: string
  description: string
  spec: object
}) {
  const id = uuidv4()

  const p = new Lens({ id, name, spec, description, isDraft: true })
  await p.validate()

  const lens = await p.save()

  return lens.dataValues
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
