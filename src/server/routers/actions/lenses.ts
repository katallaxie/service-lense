import { protectedProcedure } from '../../trpc'
import { LensDeleteSchema } from '../schemas/lens'
import { deleteLens as dl } from '@/db/services/lenses'

export const deleteLens = protectedProcedure
  .input(LensDeleteSchema)
  .query(async opts => await dl(opts.input))
