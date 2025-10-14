import { z } from 'zod'

export const clinicalVisitOccurrenceUpdate = z.object({
  person_id: z.number().int().optional(),
  visit_concept_id: z.number().int().optional(),
  visit_start_date: z.string().optional(),
  visit_start_datetime: z.string().optional(),
  visit_end_date: z.string().optional(),
  visit_end_datetime: z.string().optional(),
  visit_type_concept_id: z.number().int().optional(),
  provider_id: z.number().int().optional(),
  care_site_id: z.number().int().optional(),
  visit_source_value: z.string().optional(),
  visit_source_concept_id: z.number().int().optional(),
  admitted_from_concept_id: z.number().int().optional(),
  admitted_from_source_value: z.string().optional(),
  discharged_to_concept_id: z.number().int().optional(),
  discharged_to_source_value: z.string().optional(),
  preceding_visit_occurrence_id: z.number().int().optional(),
})

export type ClinicalVisitOccurrenceUpdate = {
  person_id?: number | undefined
  visit_concept_id?: number | undefined
  visit_start_date?: string | undefined
  visit_start_datetime?: string | undefined
  visit_end_date?: string | undefined
  visit_end_datetime?: string | undefined
  visit_type_concept_id?: number | undefined
  provider_id?: number | undefined
  care_site_id?: number | undefined
  visit_source_value?: string | undefined
  visit_source_concept_id?: number | undefined
  admitted_from_concept_id?: number | undefined
  admitted_from_source_value?: string | undefined
  discharged_to_concept_id?: number | undefined
  discharged_to_source_value?: string | undefined
  preceding_visit_occurrence_id?: number | undefined
}
