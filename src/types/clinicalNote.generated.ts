import { z } from 'zod'

export const clinicalNote = z.object({
  id: z.number().int(),
  person_id: z.number().int(),
  note_date: z.string(),
  note_datetime: z.string().optional(),
  note_type_concept_id: z.number().int(),
  note_class_concept_id: z.number().int(),
  note_title: z.string().optional(),
  note_text: z.string(),
  encoding_concept_id: z.number().int(),
  language_concept_id: z.number().int(),
  provider_id: z.number().int().optional(),
  visit_occurrence_id: z.number().int().optional(),
  visit_detail_id: z.number().int().optional(),
  note_source_value: z.string().optional(),
  note_event_id: z.number().int().optional(),
  note_event_field_concept_id: z.number().int().optional(),
})

export type ClinicalNote = {
  id: number
  person_id: number
  note_date: string
  note_datetime?: string | undefined
  note_type_concept_id: number
  note_class_concept_id: number
  note_title?: string | undefined
  note_text: string
  encoding_concept_id: number
  language_concept_id: number
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  note_source_value?: string | undefined
  note_event_id?: number | undefined
  note_event_field_concept_id?: number | undefined
}
