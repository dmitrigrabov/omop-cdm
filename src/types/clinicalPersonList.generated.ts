import {
  clinicalPerson,
  ClinicalPerson,
} from '@/types/clinicalPerson.generated.ts'
import { z } from 'zod'

export const clinicalPersonList = z.object({
  data: z.array(clinicalPerson),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalPersonList = {
  data: Array<ClinicalPerson>
  pagination: { total: number; offset: number; limit: number; count: number }
}
