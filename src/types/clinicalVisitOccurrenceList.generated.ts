import {
  clinicalVisitOccurrence,
  ClinicalVisitOccurrence,
} from '@/types/clinicalVisitOccurrence.generated.ts'
import { z } from 'zod'

export const clinicalVisitOccurrenceList = z.object({
  data: z.array(clinicalVisitOccurrence),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalVisitOccurrenceList = {
  data: Array<ClinicalVisitOccurrence>
  pagination: { total: number; offset: number; limit: number; count: number }
}
