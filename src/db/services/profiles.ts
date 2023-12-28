import { v4 as uuidv4 } from 'uuid'
import {
  Profile,
  ProfileQuestion,
  ProfileQuestionAnswer,
  ProfileQuestionChoice,
  sequelize
} from '..'
import {
  FindAndCountProfilesSchema,
  FindOneProfileSchema,
  CreateProfileSchema,
  FindAllProfilesQuestionsSchema
} from '../schemas/profiles'
import { z } from 'zod'

export type Pagination = {
  offset?: number
  limit?: number
}

export const createProfile = async (
  opts: z.infer<typeof CreateProfileSchema>
) =>
  sequelize.transaction(async transaction => {
    const profile = await Profile.create(
      { id: uuidv4(), ...opts },
      { transaction }
    )

    await ProfileQuestionAnswer.bulkCreate(
      Object.values(opts.selectedChoices)
        .flatMap(choices => choices)
        .map(choice => ({
          choiceId: BigInt(choice),
          profileId: profile.id
        })),
      { transaction }
    )

    return profile
  })

export async function deleteProfile(id: string) {
  return await Profile.destroy({ where: { id } })
}

export const findOneProfile = async (
  opts: z.infer<typeof FindOneProfileSchema>
) =>
  await Profile.findOne({
    where: { id: opts },
    include: [ProfileQuestionChoice]
  })

export const findAndCountProfiles = async (
  opts: z.infer<typeof FindAndCountProfilesSchema>
) =>
  await Profile.findAndCountAll({
    order: [['name', 'DESC']],
    include: [ProfileQuestionChoice],
    ...opts
  })

export const findAllProfilesQuestions = async (
  opts: z.infer<typeof FindAllProfilesQuestionsSchema>
) =>
  await ProfileQuestion.findAll({
    order: [['name', 'DESC']],
    include: [ProfileQuestionChoice],
    ...opts
  })
