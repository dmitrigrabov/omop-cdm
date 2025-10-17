import {
  healthsystemPayerPlanPeriod,
  HealthsystemPayerPlanPeriod,
} from '@/types/healthsystemPayerPlanPeriod.generated.ts'
import { z } from 'zod'

export const healthsystemPayerPlanPeriodList = z.object({
  data: z.array(healthsystemPayerPlanPeriod),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type HealthsystemPayerPlanPeriodList = {
  data: Array<HealthsystemPayerPlanPeriod>
  pagination: { total: number; offset: number; limit: number; count: number }
}
