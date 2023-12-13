'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { rhfActionSchema } from './add-solution.schema'
import { addSolution } from '@/db/services/solutions'
import { v4 as uuidv4 } from 'uuid'

export const rhfAction = createAction(
  protectedProcedure.input(rhfActionSchema).mutation(async opts => {
    await addSolution({
      id: uuidv4(),
      ...opts.input
    })
    return {}
  })
)
