import { z } from 'zod'

export const WorkloadLensQuestionSchema = z.object({
  workloadId: z.string().uuid(),
  lensId: z.string().uuid(),
  questionId: z.string()
})
