import { PaginationSchema } from './pagination'
import { z } from 'zod'

export const SolutionListSchema = PaginationSchema
export const SolutionAddSchema = z.object({
  name: z.string().min(3).max(256),
  description: z.string().min(10).max(2048)
})
export const SolutionGetSchema = z.string().uuid()
