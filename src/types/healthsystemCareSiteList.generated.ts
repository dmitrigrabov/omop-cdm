import {
  healthsystemCareSite,
  HealthsystemCareSite,
} from '@/types/healthsystemCareSite.generated.ts'
import { z } from 'zod'

export const healthsystemCareSiteList = z.object({
  data: z.array(healthsystemCareSite),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type HealthsystemCareSiteList = {
  data: Array<HealthsystemCareSite>
  pagination: { total: number; offset: number; limit: number; count: number }
}
