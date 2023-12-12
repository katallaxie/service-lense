import { protectedProcedure } from '../../trpc'
import {
  WorkloadGetSchema,
  WorkloadGetQuestionSchema
} from '../schemas/workload'
import {
  getWorkload as gw,
  getWorkloadAnswer as gwa
} from '@/db/services/workloads'

export const getWorkload = protectedProcedure
  .input(WorkloadGetSchema)
  .query(async opts => await gw(opts.input))

export const getWorkloadAnswer = protectedProcedure
  .input(WorkloadGetQuestionSchema)
  .query(async opts => gwa(opts.input))
