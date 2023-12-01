import { z } from 'zod'
import { publicProcedure, protectedProcedure, router } from '../trpc'
import { findAndCountLenses } from '@/db/services/lenses'
import { findAndCountWorkloads } from '@/db/services/workloads'
import { PaginationSchema } from './schemas/pagination'

import { listEnvironments } from './actions/environments'

export const listLenses = protectedProcedure
  .input(PaginationSchema)
  .query(async opts => await findAndCountLenses({ ...opts.input }))

export const listWorkloads = protectedProcedure
  .input(PaginationSchema)
  .query(async opts => await findAndCountWorkloads({ ...opts.input }))

export const appRouter = router({
  greeting: publicProcedure
    .input(
      z.object({
        text: z.string()
      })
    )
    .query(async opts => {
      console.log('request from', opts.ctx.headers?.['x-trpc-source'])
      return `hello ${opts.input.text} - ${Math.random()}`
    }),

  secret: publicProcedure.query(async opts => {
    if (!opts.ctx.session) {
      return 'You are not authenticated'
    }

    return "Cool, you're authenticated!"
  }),

  me: publicProcedure.query(opts => {
    return opts.ctx.session
  }),

  listEnvironments,
  listLenses,
  listWorkloads
})

export type AppRouter = typeof appRouter
