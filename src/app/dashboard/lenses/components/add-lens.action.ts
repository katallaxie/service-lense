'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { AddLensActionSchema } from './add-lens.schema'
import { addLens } from '@/db/services/lenses'

export const addLensAction = createAction(
  protectedProcedure
    .input(AddLensActionSchema)
    .mutation(async opts => await addLens({ ...opts.input }))
)
