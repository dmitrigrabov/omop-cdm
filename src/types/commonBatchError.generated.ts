import { z } from 'zod'

export const commonBatchError = z.object({
  index: z.number().int(),
  message: z.string(),
  item: z.record(z.string(), z.string()),
})

export type CommonBatchError = {
  index: number
  message: string
  item: Record<string, string>
}
