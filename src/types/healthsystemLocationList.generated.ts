import {
  healthsystemLocation,
  HealthsystemLocation,
} from '@/types/healthsystemLocation.generated.ts'
import { z } from 'zod'

export const healthsystemLocationList = z.object({
  data: z.array(healthsystemLocation),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type HealthsystemLocationList = {
  data: Array<HealthsystemLocation>
  pagination: { total: number; offset: number; limit: number; count: number }
}
