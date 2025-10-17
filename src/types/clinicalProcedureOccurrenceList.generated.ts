import {
  clinicalProcedureOccurrence,
  ClinicalProcedureOccurrence,
} from '@/types/clinicalProcedureOccurrence.generated.ts'
import { z } from 'zod'

export const clinicalProcedureOccurrenceList = z.object({
  data: z.array(clinicalProcedureOccurrence),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalProcedureOccurrenceList = {
  data: Array<ClinicalProcedureOccurrence>
  pagination: { total: number; offset: number; limit: number; count: number }
}
