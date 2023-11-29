import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { findAndCountLenses } from '@/db/services/lenses'

export const listLenses = publicProcedure
  .input(
    z.object({
      limit: z.number().default(10),
      offset: z.number().default(0)
    })
  )
  .query(async opts => await findAndCountLenses({ ...opts.input }))

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

  listLenses
})

export type AppRouter = typeof appRouter
