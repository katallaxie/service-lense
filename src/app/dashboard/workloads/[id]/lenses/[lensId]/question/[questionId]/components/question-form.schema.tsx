import { z } from 'zod'

export const rhfActionSchema = z.object({
  selectedChoices: z.array(z.string()).default([]),
  notes: z.string().optional()
})
