import { z } from 'zod'

export const WorkloadLensQuestionSchema = z.object({
  workloadId: z.string().uuid(),
  lensId: z.string().uuid(),
  questionId: z.string()
})

export const WorkloadGetLensAnswer = z.object({
  workloadId: z.string().uuid(),
  lensPillarQuestionId: z.string()
})
