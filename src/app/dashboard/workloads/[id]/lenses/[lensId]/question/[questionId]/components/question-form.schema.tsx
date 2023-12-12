import { z } from 'zod'

export const rhfActionSchema = z.object({
  selectedChoices: z.array(z.string()).default([]),
  doesNotApply: z.boolean().optional(),
  doesNotApplyReason: z.string().optional(),
  notes: z.string().optional()
})
