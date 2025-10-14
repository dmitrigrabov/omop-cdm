import { z } from 'zod'

export type ClinicalConditionOccurrence = {
  condition_occurrence_id: number
  person_id: number
  condition_concept_id: number
  condition_start_date: string
  condition_start_datetime?: string | undefined
  condition_end_date?: string | undefined
  condition_end_datetime?: string | undefined
  condition_type_concept_id: number
  condition_status_concept_id?: number | undefined
  stop_reason?: string | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  condition_source_value?: string | undefined
  condition_source_concept_id?: number | undefined
  condition_status_source_value?: string | undefined
}

export const clinicalConditionOccurrence = z.object({
  condition_occurrence_id: z.number().int(),
  person_id: z.number().int(),
  condition_concept_id: z.number().int(),
  condition_start_date: z.string(),
  condition_start_datetime: z.string().optional(),
  condition_end_date: z.string().optional(),
  condition_end_datetime: z.string().optional(),
  condition_type_concept_id: z.number().int(),
  condition_status_concept_id: z.number().int().optional(),
  stop_reason: z.string().optional(),
  provider_id: z.number().int().optional(),
  visit_occurrence_id: z.number().int().optional(),
  visit_detail_id: z.number().int().optional(),
  condition_source_value: z.string().optional(),
  condition_source_concept_id: z.number().int().optional(),
  condition_status_source_value: z.string().optional(),
})
