import { z } from 'zod'

export const WorkloadDeleteSchema = z.string().uuid()
