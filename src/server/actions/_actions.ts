'use server'

import { createAction, publicProcedure } from '@/server/trpc'
import { z } from 'zod'
import { addLens } from '@/db/services/lenses'

export const createLens = createAction(
  publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string()
      })
    )
    .mutation(async opts => {
      const { name, description } = opts.input
      const lens = await addLens({ name, description, spec: '' })

      return lens
    })
)
