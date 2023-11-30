'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { CreateLensSchema } from './create.schema'
import { addLens } from '@/db/services/lenses'

export const createLensAction = createAction(
  protectedProcedure
    .input(CreateLensSchema)
    .mutation(async opts => await addLens({ ...opts.input }))
)
