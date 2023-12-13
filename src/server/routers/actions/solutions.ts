import { protectedProcedure } from '../../trpc'
import { findAndCountSolutions } from '@/db/services/solutions'
import { SolutionListSchema } from '../schemas/solution'

export const listSolutions = protectedProcedure
  .input(SolutionListSchema)
  .query(async opts => findAndCountSolutions(opts.input))
