import { z } from 'zod'

export const commonValidationError = z.object({
  field: z.string(),
  message: z.string(),
  rejectedValue: z.string().optional(),
})

export type CommonValidationError = {
  field: string
  message: string
  rejectedValue?: string | undefined
}
