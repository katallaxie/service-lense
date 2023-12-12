'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { rhfActionSchema } from './question-form.schema'
import { updateWorkloadAnswer } from '@/db/services/workloads'

/**
 * Either inline procedures using trpc's flexible
 * builder api, with input parsers and middleware
 * Wrap the procedure in a `createAction` call to
 * make it server-action friendly
 */
export const rhfAction = createAction(
  protectedProcedure.input(rhfActionSchema).mutation(async opts => {
    await updateWorkloadAnswer({
      answerId: opts.input.answerId,
      doesNotApply: opts.input.doesNotApply ?? false,
      doesNotApplyReason: opts.input.doesNotApplyReason ?? ''
    })
    return {}
  })
)
