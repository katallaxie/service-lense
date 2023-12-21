import { z } from 'zod'

export const rhfActionSchema = z.object({
  name: z.string().min(1).max(256).default(''),
  description: z.string().min(20).max(2048).default('')
})
