import {
  clinicalDeath,
  ClinicalDeath,
} from '@/types/clinicalDeath.generated.ts'
import { z } from 'zod'

export const clinicalDeathList = z.object({
  data: z.array(clinicalDeath),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalDeathList = {
  data: Array<ClinicalDeath>
  pagination: { total: number; offset: number; limit: number; count: number }
}
