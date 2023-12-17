import { z } from 'zod'
import { publicProcedure, router } from '../trpc'
import { deleteLens, listLenses } from './actions/lenses'
import {
  getWorkload,
  getWorkloadAnswer,
  listWorkloads,
  deleteWorkload
} from './actions/workloads'
import { getLens, getLensQuestion } from './actions/lenses'
import { listProfiles } from './actions/profiles'
import { listEnvironments } from './actions/environments'
import { listSolutions, addSolution, getSolution } from './actions/solutions'

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

  addSolution,
  deleteLens,
  deleteWorkload,
  getLens,
  getLensQuestion,
  getSolution,
  getWorkload,
  getWorkloadAnswer,
  listEnvironments,
  listLenses,
  listSolutions,
  listWorkloads,
  listProfiles
})

export type AppRouter = typeof appRouter
