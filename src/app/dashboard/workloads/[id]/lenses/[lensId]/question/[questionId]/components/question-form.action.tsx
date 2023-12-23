'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { rhfActionSchema } from './question-form.schema'
import { updateWorkloadAnswer } from '@/db/services/workloads'

export const rhfAction = createAction(
  protectedProcedure.input(rhfActionSchema).mutation(async opts => {
    console.log(opts.input)

    // await updateWorkloadAnswer({
    //   answerId: opts.input.answerId,
    //   doesNotApply: opts.input.doesNotApply ?? false,
    //   doesNotApplyReason: opts.input.doesNotApplyReason ?? ''
    // })
    // return {}
  })
)
