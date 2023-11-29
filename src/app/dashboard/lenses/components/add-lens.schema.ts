import { z } from 'zod'

export const AddLensActionSchema = z.object({
  name: z.string().min(3, {}),
  //   spec: z.union([
  //     z
  //       .custom<FileList>()
  //       .transform(file => file.length > 0 && file.item(0))
  //       .refine(file => file),
  //     z.string()
  //   ]),
  spec: z.object({}),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 30 characters.'
    })
    .max(2024, {
      message: 'Description must be less than 2024 characters.'
    })
})
