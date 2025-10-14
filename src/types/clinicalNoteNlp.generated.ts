import { z } from 'zod'

export const clinicalNoteNlp = z.object({
  note_nlp_id: z.number().int(),
  note_id: z.number().int(),
  section_concept_id: z.number().int().optional(),
  snippet: z.string().optional(),
  lexical_variant: z.string(),
  note_nlp_concept_id: z.number().int().optional(),
  note_nlp_source_concept_id: z.number().int().optional(),
  nlp_system: z.string().optional(),
  nlp_date: z.string(),
  nlp_datetime: z.string().optional(),
  term_exists: z.string().optional(),
  term_temporal: z.string().optional(),
  term_modifiers: z.string().optional(),
})

export type ClinicalNoteNlp = {
  note_nlp_id: number
  note_id: number
  section_concept_id?: number | undefined
  snippet?: string | undefined
  lexical_variant: string
  note_nlp_concept_id?: number | undefined
  note_nlp_source_concept_id?: number | undefined
  nlp_system?: string | undefined
  nlp_date: string
  nlp_datetime?: string | undefined
  term_exists?: string | undefined
  term_temporal?: string | undefined
  term_modifiers?: string | undefined
}
