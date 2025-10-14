import { z } from 'zod'

export type CommonPaginationInfo = {
  total: number
  offset: number
  limit: number
  count: number
}

export const commonPaginationInfo = z.object({
  total: z.number().int(),
  offset: z.number().int(),
  limit: z.number().int(),
  count: z.number().int(),
})
