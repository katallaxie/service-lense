import { z } from 'zod'

export const FindAndCountSolutionsSchema = z.object({
  limit: z.number().min(0).max(100).default(10),
  offset: z.number().min(0).default(0)
})

export const SolutionsGetSchema = z.string().uuid()
export const SolutionCommentAddSchema = z.object({
  solutionId: z.string().uuid().readonly(),
  body: z.string().min(1)
})
export const SolutionCommentDeleteSchema = z.string()