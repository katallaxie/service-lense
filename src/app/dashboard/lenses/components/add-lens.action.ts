'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { AddLensActionSchema } from './add-lens.schema'
import { addLens } from '@/db/services/lenses'

export const addLensAction = createAction(
  protectedProcedure.input(AddLensActionSchema).mutation(async opts => {
    const lens = await addLens({ ...opts.input, spec: {} })

    return { name: 'hello', description: 'world', spec: { name: 'test' } }
  })
)
