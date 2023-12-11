'use server'

import { createAction, protectedProcedure } from '@/server/trpc'
import { rhfActionSchema } from './question-form.schema'

/**
 * Either inline procedures using trpc's flexible
 * builder api, with input parsers and middleware
 * Wrap the procedure in a `createAction` call to
 * make it server-action friendly
 */
export const rhfAction = createAction(
  protectedProcedure.input(rhfActionSchema).mutation(async opts => {
    console.log('testMutation called', opts)
    return {
      text: `Hello ${opts.input.text}`,
      date: new Date()
    }
  })
)
