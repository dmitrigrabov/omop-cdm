import {
  healthsystemCost,
  HealthsystemCost,
} from '@/types/healthsystemCost.generated.ts'
import { z } from 'zod'

export const healthsystemCostList = z.object({
  data: z.array(healthsystemCost),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type HealthsystemCostList = {
  data: Array<HealthsystemCost>
  pagination: { total: number; offset: number; limit: number; count: number }
}
