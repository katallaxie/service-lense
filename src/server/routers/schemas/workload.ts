import { z } from 'zod'

export const WorkloadDeleteSchema = z.string().uuid()
export const WorkloadGetSchema = z.string().uuid()
export const WorkloadGetQuestionSchema = z.object({
  workloadId: z.string(),
  questionId: z.string()
})
