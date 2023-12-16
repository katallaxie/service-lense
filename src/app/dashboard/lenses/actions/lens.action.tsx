'use server'

import 'server-only'
import { createAction, protectedProcedure } from '@/server/trpc'
import { rhfActionDeleteLensSchema } from './lens.schema'
import { deleteLens } from '@/db/services/lenses'
import { revalidatePath } from 'next/cache'

export const rhfActionDeleteLens = createAction(
  protectedProcedure
    .input(rhfActionDeleteLensSchema)
    .mutation(async opts => {
        await deleteLens(opts.input)
        revalidatePath('/dashboard/lenses')
    })
)
