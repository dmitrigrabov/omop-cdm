import { z } from 'zod'

export type CommonBatchError = {
  index: number
  message: string
  item: Record<string, string>
}

export const commonBatchError = z.object({
  index: z.number().int(),
  message: z.string(),
  item: z.record(z.string(), z.string()),
})
