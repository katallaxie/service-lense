import { v4 as uuidv4 } from 'uuid'
import { Profile, ProfileQuestion, ProfileQuestionAnswer } from '..'
import {
  FindAndCountProfilesSchema,
  FindOneProfileSchema
} from '../schemas/profiles'
import { z } from 'zod'

export type Pagination = {
  offset?: number
  limit?: number
}

export async function addProfile({
  name,
  description
}: {
  name: string
  description: string
}) {
  const id = uuidv4()

  const p = new Profile({ id, name, description })
  await p.validate()

  const profile = await p.save()

  return profile.dataValues
}

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
