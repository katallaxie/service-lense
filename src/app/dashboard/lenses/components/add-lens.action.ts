'use server'

import { createAction, publicProcedure } from '@/server/trpc'
import { AddLensActionSchema } from './add-lens.schema'
import { addLens } from '@/db/services/lenses'

export const addLensAction = createAction(
  publicProcedure.input(AddLensActionSchema).mutation(async opts => {
    const lens = await addLens({ ...opts.input })

    console.log(lens)

    return { name: 'hello', description: 'world', spec: {} }
  })
)
