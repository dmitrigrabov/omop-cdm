import {
  CommonValidationError,
  commonValidationError,
} from '@/types/commonValidationError.generated.ts'
import { z } from 'zod'

export type CommonErrorResponse = {
  code: number
  message: string
  details?: string | undefined
  validation?: Array<CommonValidationError> | undefined
}

export const commonErrorResponse = z.object({
  code: z.number().int(),
  message: z.string(),
  details: z.string().optional(),
  validation: z.array(commonValidationError).optional(),
})
