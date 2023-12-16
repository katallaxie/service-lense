import { z } from 'zod'

export const LensesGetSchema = z.string().uuid()
export const LensesDeleteSchema = z.string().uuid()
