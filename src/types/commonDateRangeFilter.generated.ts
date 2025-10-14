import { z } from 'zod'

export const commonDateRangeFilter = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

export type CommonDateRangeFilter = {
  startDate?: string | undefined
  endDate?: string | undefined
}
