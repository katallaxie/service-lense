import {
  Profile,
  Workload,
  WorkloadEnvironment,
  Environment,
  Lens,
  LensPillar,
  LensPillarQuestion,
  LensPillarChoice,
  WorkloadLens,
  WorkloadLensesAnswer,
  WorkloadLensesAnswerChoice
} from '..'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import type { WorkloadCreationAttributes } from '../models/workload'
import { sequelize } from '..'
import {
  WorkloadLensQuestionSchema,
  WorkloadGetLensAnswer
} from '../schemas/workload'

export const findWorkloadLensAnswer = async (
  opts: z.infer<typeof WorkloadGetLensAnswer>
) => await WorkloadLensesAnswer.findOne({ where: { ...opts } })

export const countWorkloads = async () => await Workload.count()

export async function createWorkload({
  name,
  description,
  profilesId,
  environmentsIds,
  lensesIds
}: WorkloadCreationAttributes & {
  environmentsIds: number[]
  lensesIds: string[]
}) {
  return await sequelize.transaction(async transaction => {
    const id = uuidv4()

    const workload = await Workload.create(
      {
        id,
        profilesId,
        name,
        description
      },
      { transaction }
    )

    const items = Array.from(environmentsIds).map(id => ({
      environmentId: id,
      workloadId: workload.id
    }))
    await WorkloadEnvironment.bulkCreate(items, { transaction })

    await WorkloadLens.bulkCreate(
      Array.from(lensesIds).map(lensId => ({
        workloadId: workload.id,
        lensId
      })),
      { transaction }
    )

    return workload.dataValues
  })
}

export const deleteWorkload = async (id: string) =>
  await Workload.update({ deletedAt: new Date(Date.now()) }, { where: { id } })

export const getWorkloadLensQuestion = async (
  opts: z.infer<typeof WorkloadLensQuestionSchema>
) =>
  await Workload.findOne({
    where: { id: opts.workloadId },
    include: [
      {
        model: Lens,
        include: [
          {
            model: LensPillar,
            include: [
              {
                model: LensPillarQuestion,
                where: { id: '1' }
              }
            ]
          }
        ]
      }
    ]
  })

export const updateWorkloadAnswer = async ({
  answerId,
  doesNotApply,
  doesNotApplyReason
}: {
  answerId: string
  doesNotApply: boolean
  doesNotApplyReason: string
}) =>
  await sequelize.transaction(async transaction => {
    // const answer = await WorkloadLensPillarAnswer.findOne({
    //   where: { id: answerId },
    //   transaction
    // })
    // if (!answer) {
    //   throw Error('Answer not found')
    // }
    // answer.doesNotApply = doesNotApply
    // answer.doesNotApplyReason = doesNotApplyReason
    // await answer?.save({ transaction })
  })

export const getWorkload = async (id: string) =>
  await Workload.findOne({
    where: { id },
    include: [Profile, Environment, Lens, WorkloadLens]
  })

export type Pagination = {
  offset?: number
  limit?: number
}

export async function findAndCountWorkloads({
  offset = 0,
  limit = 10
}: Pagination) {
  const workloads = await Workload.findAndCountAll({
    include: [Profile, Environment],
    order: [['name', 'DESC']],
    offset,
    limit
  })

  return workloads
}
