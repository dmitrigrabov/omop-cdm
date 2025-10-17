import {
  clinicalConditionOccurrence,
  ClinicalConditionOccurrence,
} from '@/types/clinicalConditionOccurrence.generated.ts'
import { z } from 'zod'

export const clinicalConditionOccurrenceList = z.object({
  data: z.array(clinicalConditionOccurrence),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalConditionOccurrenceList = {
  data: Array<ClinicalConditionOccurrence>
  pagination: { total: number; offset: number; limit: number; count: number }
}
