'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { AddLensActionSchema } from './add-lens.schema'
import { addLens } from '@/db/services/lenses'
import { add } from 'date-fns'

export const addLensAction = createAction(
  protectedProcedure.input(AddLensActionSchema).mutation(async opts => {
    return addLens({ ...opts.input })
  })
)
