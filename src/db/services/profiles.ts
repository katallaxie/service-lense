import { Workload } from '..'
import { v4 as uuidv4 } from 'uuid'
import type { ProfileCreationAttributes } from '../models/profile'
import { Profile } from '../models/profile'

export async function addProfile({
  name,
  description
}: ProfileCreationAttributes) {
  const id = uuidv4()

  const p = new Profile({ id, name, description })
  await p.validate()

  const profile = await p.save()

  return profile.dataValues
}

export async function deleteProfile(id: string) {
  return await Profile.destroy({ where: { id } })
}

export async function getProfile(id: string) {
  return await Profile.findOne({ where: { id } })
}
