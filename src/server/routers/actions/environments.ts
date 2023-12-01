import { protectedProcedure } from '../../trpc'
import { PaginationSchema } from '../schemas/pagination'
import { findCountEnvironments } from '@/db/services/environments'

export const listEnvironments = protectedProcedure
  .input(PaginationSchema)
  .query(async opts => await findCountEnvironments({ ...opts.input }))
