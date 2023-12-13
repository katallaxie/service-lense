import { z } from 'zod'

export const rhfActionSchema = z.object({
  name: z.string().min(3).max(256).default(''),
  description: z.string().min(10).max(2048).optional()
})
