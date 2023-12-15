'use server'

import 'server-only'
import { createAction, protectedProcedure } from '@/server/trpc'
import { rhfActionSchema } from './new-form.schema'
import { addLens } from '@/db/services/lenses'
import { v4 as uuidv4 } from 'uuid'

export const rhfAction = createAction(
  protectedProcedure.input(rhfActionSchema).mutation(
    async opts =>
      await addLens({
        id: uuidv4(),
        name: opts.input.name,
        description: opts.input.description,
        spec: opts.input.spec
      })
  )
)
