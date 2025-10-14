import { z } from 'zod'

export const clinicalNoteNlpUpdate = z.object({
  note_id: z.number().int().optional(),
  section_concept_id: z.number().int().optional(),
  snippet: z.string().optional(),
  lexical_variant: z.string().optional(),
  note_nlp_concept_id: z.number().int().optional(),
  note_nlp_source_concept_id: z.number().int().optional(),
  nlp_system: z.string().optional(),
  nlp_date: z.string().optional(),
  nlp_datetime: z.string().optional(),
  term_exists: z.string().optional(),
  term_temporal: z.string().optional(),
  term_modifiers: z.string().optional(),
})

export type ClinicalNoteNlpUpdate = {
  note_id?: number | undefined
  section_concept_id?: number | undefined
  snippet?: string | undefined
  lexical_variant?: string | undefined
  note_nlp_concept_id?: number | undefined
  note_nlp_source_concept_id?: number | undefined
  nlp_system?: string | undefined
  nlp_date?: string | undefined
  nlp_datetime?: string | undefined
  term_exists?: string | undefined
  term_temporal?: string | undefined
  term_modifiers?: string | undefined
}
