import { z } from 'zod'

export type CommonValidationError = {
  field: string
  message: string
  rejectedValue?: string | undefined
}

export const commonValidationError = z.object({
  field: z.string(),
  message: z.string(),
  rejectedValue: z.string().optional(),
})
