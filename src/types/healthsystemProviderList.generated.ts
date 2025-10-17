import {
  healthsystemProvider,
  HealthsystemProvider,
} from '@/types/healthsystemProvider.generated.ts'
import { z } from 'zod'

export const healthsystemProviderList = z.object({
  data: z.array(healthsystemProvider),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type HealthsystemProviderList = {
  data: Array<HealthsystemProvider>
  pagination: { total: number; offset: number; limit: number; count: number }
}
