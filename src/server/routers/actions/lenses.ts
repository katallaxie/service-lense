import { protectedProcedure } from '../../trpc'
import { LensDeleteSchema, LensGetSchema } from '../schemas/lens'
import { deleteLens as dl } from '@/db/services/lenses'
import { getLens as gl } from '@/db/services/lenses'

export const deleteLens = protectedProcedure
  .input(LensDeleteSchema)
  .query(async opts => await dl(opts.input))

export const getLens = protectedProcedure
  .input(LensGetSchema)
  .query(async opts => await gl(opts.input))
