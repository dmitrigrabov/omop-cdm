import {
  clinicalNoteNlp,
  ClinicalNoteNlp,
} from '@/types/clinicalNoteNlp.generated.ts'
import { z } from 'zod'

export const clinicalNoteNlpList = z.object({
  data: z.array(clinicalNoteNlp),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalNoteNlpList = {
  data: Array<ClinicalNoteNlp>
  pagination: { total: number; offset: number; limit: number; count: number }
}
