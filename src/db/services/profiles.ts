import { v4 as uuidv4 } from 'uuid'
import { Profile } from '..'

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

export async function getProfile(id: string) {
  return await Profile.findOne({ where: { id } })
}

export async function findAndCountProfiles() {
  const workloads = await Profile.findAndCountAll({
    order: [['name', 'DESC']],
    offset: 0,
    limit: 5
  })

  return workloads
}
