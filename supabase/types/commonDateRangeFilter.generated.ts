import { z } from 'zod'

export type CommonDateRangeFilter = {
  startDate?: string | undefined
  endDate?: string | undefined
}

export const commonDateRangeFilter = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})
