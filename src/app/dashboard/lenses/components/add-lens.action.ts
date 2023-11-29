'use server'

import { createAction, publicProcedure } from '@/server/trpc'
import { AddLensActionSchema } from './add-lens.schema'

export const addLensAction = createAction(
  publicProcedure.input(AddLensActionSchema).mutation(async opts => {
    return { ...opts.input }
  })
)
