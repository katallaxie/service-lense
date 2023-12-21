import { v4 as uuidv4 } from 'uuid'
import { Profile, ProfileQuestion, ProfileQuestionAnswer, sequelize } from '..'
import {
  FindAndCountProfilesSchema,
  FindOneProfileSchema,
  CreateProfileSchema
} from '../schemas/profiles'
import { z } from 'zod'

export type Pagination = {
  offset?: number
  limit?: number
}

export const createProfile = async (
  opts: z.infer<typeof CreateProfileSchema>
) =>
  sequelize.transaction(async transaction =>
    Profile.create({ id: uuidv4(), ...opts }, { transaction })
  )

export async function deleteProfile(id: string) {
  return await Profile.destroy({ where: { id } })
}

export const findOneProfile = async (
  opts: z.infer<typeof FindOneProfileSchema>
) => await Profile.findOne({ where: { id: opts } })

export const findAndCountProfiles = async (
  opts: z.infer<typeof FindAndCountProfilesSchema>
) =>
  await Profile.findAndCountAll({
    order: [['name', 'DESC']],
    include: {
      model: ProfileQuestion,
      include: [ProfileQuestionAnswer]
    },
    ...opts
  })
