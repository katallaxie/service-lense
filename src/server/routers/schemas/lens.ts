import { z } from 'zod'

export const LensDeleteSchema = z.string().uuid()
export const LensGetSchema = z.string().uuid()
export const LensGetQuestionSchema = z.string().uuid()
