import {
  derivedDrugEra,
  DerivedDrugEra,
} from '@/types/derivedDrugEra.generated.ts'
import { z } from 'zod'

export const derivedDrugEraList = z.object({
  data: z.array(derivedDrugEra),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type DerivedDrugEraList = {
  data: Array<DerivedDrugEra>
  pagination: { total: number; offset: number; limit: number; count: number }
}
