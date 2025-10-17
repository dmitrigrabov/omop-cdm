import {
  derivedConditionEra,
  DerivedConditionEra,
} from '@/types/derivedConditionEra.generated.ts'
import { z } from 'zod'

export const derivedConditionEraList = z.object({
  data: z.array(derivedConditionEra),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type DerivedConditionEraList = {
  data: Array<DerivedConditionEra>
  pagination: { total: number; offset: number; limit: number; count: number }
}
