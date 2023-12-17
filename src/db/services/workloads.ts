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
  WorkloadLensPillarAnswer
} from '..'
import { v4 as uuidv4 } from 'uuid'
import type { WorkloadCreationAttributes } from '../models/workload'
import { sequelize } from '..'

export async function createWorkload({
  name,
  description,
  profilesId,
  environmentsIds
}: WorkloadCreationAttributes & { environmentsIds: number[] }) {
  return await sequelize.transaction(async transaction => {
    const id = uuidv4()

    console.log(profilesId)

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

    return workload.dataValues
  })
}

export const deleteWorkload = async (id: string) =>
  await Workload.update({ deletedAt: new Date(Date.now()) }, { where: { id } })

export const getWorkloadAnswer = async ({
  workloadId,
  questionId
}: {
  workloadId: string
  questionId: string
}) =>
  await Workload.findOne({
    where: { id: workloadId },
    include: [
      {
        model: Lens,
        include: [{ model: LensPillar }]
      },
      {
        model: WorkloadLensPillarAnswer,
        where: { questionId }
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
    const answer = await WorkloadLensPillarAnswer.findOne({
      where: { id: answerId },
      transaction
    })

    if (!answer) {
      throw Error('Answer not found')
    }

    answer.doesNotApply = doesNotApply
    answer.doesNotApplyReason = doesNotApplyReason

    await answer?.save({ transaction })
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
