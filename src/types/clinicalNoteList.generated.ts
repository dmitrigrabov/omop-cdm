import { clinicalNote, ClinicalNote } from '@/types/clinicalNote.generated.ts'
import { z } from 'zod'

export const clinicalNoteList = z.object({
  data: z.array(clinicalNote),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalNoteList = {
  data: Array<ClinicalNote>
  pagination: { total: number; offset: number; limit: number; count: number }
}
