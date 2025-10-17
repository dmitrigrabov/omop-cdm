import {
  clinicalSpecimen,
  ClinicalSpecimen,
} from '@/types/clinicalSpecimen.generated.ts'
import { z } from 'zod'

export const clinicalSpecimenList = z.object({
  data: z.array(clinicalSpecimen),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalSpecimenList = {
  data: Array<ClinicalSpecimen>
  pagination: { total: number; offset: number; limit: number; count: number }
}
