import { z } from 'zod'
import {
  commonValidationError,
  CommonValidationError,
} from '@/types/commonValidationError.generated.ts'

export const commonErrorResponse = z.object({
  code: z.number().int(),
  message: z.string(),
  details: z.string().optional(),
  validation: z.array(commonValidationError).optional(),
})

export type CommonErrorResponse = {
  code: number
  message: string
  details?: string | undefined
  validation?: Array<CommonValidationError> | undefined
}
