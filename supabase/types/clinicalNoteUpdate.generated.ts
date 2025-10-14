import { z } from 'zod'

export const clinicalNoteUpdate = z.object({
  person_id: z.number().int().optional(),
  note_date: z.string().optional(),
  note_datetime: z.string().optional(),
  note_type_concept_id: z.number().int().optional(),
  note_class_concept_id: z.number().int().optional(),
  note_title: z.string().optional(),
  note_text: z.string().optional(),
  encoding_concept_id: z.number().int().optional(),
  language_concept_id: z.number().int().optional(),
  provider_id: z.number().int().optional(),
  visit_occurrence_id: z.number().int().optional(),
  visit_detail_id: z.number().int().optional(),
  note_source_value: z.string().optional(),
  note_event_id: z.number().int().optional(),
  note_event_field_concept_id: z.number().int().optional(),
})

export type ClinicalNoteUpdate = {
  person_id?: number | undefined
  note_date?: string | undefined
  note_datetime?: string | undefined
  note_type_concept_id?: number | undefined
  note_class_concept_id?: number | undefined
  note_title?: string | undefined
  note_text?: string | undefined
  encoding_concept_id?: number | undefined
  language_concept_id?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  note_source_value?: string | undefined
  note_event_id?: number | undefined
  note_event_field_concept_id?: number | undefined
}
