import { z } from 'zod'

export const commonPaginationInfo = z.object({
  total: z.number().int(),
  offset: z.number().int(),
  limit: z.number().int(),
  count: z.number().int(),
})

export type CommonPaginationInfo = {
  total: number
  offset: number
  limit: number
  count: number
}
