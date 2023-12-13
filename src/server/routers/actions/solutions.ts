import { protectedProcedure } from '../../trpc'
import { v4 as uuidv4 } from 'uuid'
import {
  findAndCountSolutions,
  addSolution as as
} from '@/db/services/solutions'
import { SolutionListSchema, SolutionAddSchema } from '../schemas/solution'

export const listSolutions = protectedProcedure
  .input(SolutionListSchema)
  .query(async opts => findAndCountSolutions(opts.input))

export const addSolution = protectedProcedure
  .input(SolutionAddSchema)
  .query(async opts => as({ id: uuidv4(), ...opts.input }))
