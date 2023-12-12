import { z } from 'zod'

export const rhfActionSchema = z.object({
  answerId: z.string().readonly(),
  selectedChoices: z.array(z.string()).default([]),
  doesNotApply: z.boolean().optional(),
  doesNotApplyReason: z.string().optional(),
  notes: z.string().optional()
})
