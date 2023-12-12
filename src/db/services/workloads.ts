import {
  Profile,
  Workload,
  WorkloadEnvironment,
  Environment,
  Lens,
  LensPillar,
  LensPillarQuestion,
  LensPillarChoice
} from '..'
import { v4 as uuidv4 } from 'uuid'
import type { WorkloadCreationAttributes } from '../models/workload'
import { sequelize } from '..'
import { WorkloadLensPillarAnswer } from '../models/workload-lens-pillar-question-answer'

export async function createWorkload({
  name,
  description,
  environments,
  profilesId,
  environmentsIds
}: WorkloadCreationAttributes & { environmentsIds: string[] }) {
  return await sequelize.transaction(async transaction => {
    const id = uuidv4()
    const workload = await Workload.create(
      {
        id,
        profilesId,
        name,
        environments,
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
        where: { questionId },
        include: [
          { model: LensPillarChoice },
          { model: LensPillarQuestion, include: [LensPillarChoice] }
        ]
      }
    ]
  })

export const getWorkload = async (id: string) =>
  await Workload.findOne({
    where: { id },
    include: [
      Profile,
      Environment,
      {
        model: Lens,
        include: [{ model: LensPillar, include: [LensPillarQuestion] }]
      },
      {
        model: WorkloadLensPillarAnswer,
        include: [{ model: LensPillarChoice }]
      }
    ]
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
