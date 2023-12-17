import { protectedProcedure } from '../../trpc'
import { ProfileListSchema } from '../schemas/profile'

import { findAndCountProfiles } from '@/db/services/profiles'

export const listProfiles = protectedProcedure
  .input(ProfileListSchema)
  .query(async opts => await findAndCountProfiles({ ...opts.input }))
