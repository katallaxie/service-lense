import { protectedProcedure } from '../../trpc'
import {
  WorkloadGetSchema,
  WorkloadGetQuestionSchema,
  WorkloadListSchema,
  WorkloadDeleteSchema,
  WorkloadGetLensQuestionSchema
} from '../schemas/workload'
import {
  getWorkload as gw,
  getWorkloadAnswer as gwa,
  findAndCountWorkloads,
  deleteWorkload as dt,
  getWorkloadLensQuestion
} from '@/db/services/workloads'

export const getWorkload = protectedProcedure
  .input(WorkloadGetSchema)
  .query(async opts => await gw(opts.input))

export const getWorkloadAnswer = protectedProcedure
  .input(WorkloadGetQuestionSchema)
  .query(async opts => gwa(opts.input))

export const listWorkloads = protectedProcedure
  .input(WorkloadListSchema)
  .query(async opts => await findAndCountWorkloads({ ...opts.input }))

export const deleteWorkload = protectedProcedure
  .input(WorkloadDeleteSchema)
  .query(async opts => await dt(opts.input))

export const findWorkloadLensQuestion = protectedProcedure
  .input(WorkloadGetLensQuestionSchema)
  .query(async opts => await getWorkloadLensQuestion(opts.input))
