'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { rhfActionSchema } from './comment-form.schema'
import { updateWorkloadAnswer } from '@/db/services/workloads'

export const rhfAction = createAction(
  protectedProcedure.input(rhfActionSchema).mutation(async opts => {
    // await updateWorkloadAnswer({
    //   answerId: opts.input.answerId,
    //   doesNotApply: opts.input.doesNotApply ?? false,
    //   doesNotApplyReason: opts.input.doesNotApplyReason ?? ''
    // })
    return {}
  })
)
