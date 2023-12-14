'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { rhfActionSchema } from './comment-form.schema'
import { addSolutionComment } from '@/db/services/solutions'
import { revalidatePath } from 'next/cache'

export const rhfAction = createAction(
  protectedProcedure.input(rhfActionSchema).mutation(async opts => {
    const comment = await addSolutionComment({ ...opts.input })
    revalidatePath('/dashboard/workloads')
    return comment
  })
)
