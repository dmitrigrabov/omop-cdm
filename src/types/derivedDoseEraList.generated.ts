import {
  derivedDoseEra,
  DerivedDoseEra,
} from '@/types/derivedDoseEra.generated.ts'
import { z } from 'zod'

export const derivedDoseEraList = z.object({
  data: z.array(derivedDoseEra),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type DerivedDoseEraList = {
  data: Array<DerivedDoseEra>
  pagination: { total: number; offset: number; limit: number; count: number }
}
