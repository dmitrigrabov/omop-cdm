import { z } from 'zod'

export const commonSuccessResponse = z.object({
  message: z.string(),
  metadata: z.record(z.string(), z.string()).optional(),
})

export type CommonSuccessResponse = {
  message: string
  metadata?: Record<string, string> | undefined
}
