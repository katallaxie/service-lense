import { protectedProcedure } from '../../trpc'
import { WorkloadGetSchema } from '../schemas/workload'
import { getWorkload as gw } from '@/db/services/workloads'

export const getWorkload = protectedProcedure
  .input(WorkloadGetSchema)
  .query(async opts => await gw(opts.input))
