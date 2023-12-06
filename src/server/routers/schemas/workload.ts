import { z } from 'zod'

export const WorkloadDeleteSchema = z.string().uuid()
export const WorkloadGetSchema = z.string().uuid()
