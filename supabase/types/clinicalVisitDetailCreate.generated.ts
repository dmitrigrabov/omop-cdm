import { z } from 'zod'

export const clinicalVisitDetailCreate = z.object({
  person_id: z.number().int(),
  visit_detail_concept_id: z.number().int(),
  visit_detail_start_date: z.string(),
  visit_detail_start_datetime: z.string().optional(),
  visit_detail_end_date: z.string(),
  visit_detail_end_datetime: z.string().optional(),
  visit_detail_type_concept_id: z.number().int(),
  provider_id: z.number().int().optional(),
  care_site_id: z.number().int().optional(),
  visit_detail_source_value: z.string().optional(),
  visit_detail_source_concept_id: z.number().int().optional(),
  admitted_from_concept_id: z.number().int().optional(),
  admitted_from_source_value: z.string().optional(),
  discharged_to_source_value: z.string().optional(),
  discharged_to_concept_id: z.number().int().optional(),
  preceding_visit_detail_id: z.number().int().optional(),
  parent_visit_detail_id: z.number().int().optional(),
  visit_occurrence_id: z.number().int(),
})

export type ClinicalVisitDetailCreate = {
  person_id: number
  visit_detail_concept_id: number
  visit_detail_start_date: string
  visit_detail_start_datetime?: string | undefined
  visit_detail_end_date: string
  visit_detail_end_datetime?: string | undefined
  visit_detail_type_concept_id: number
  provider_id?: number | undefined
  care_site_id?: number | undefined
  visit_detail_source_value?: string | undefined
  visit_detail_source_concept_id?: number | undefined
  admitted_from_concept_id?: number | undefined
  admitted_from_source_value?: string | undefined
  discharged_to_source_value?: string | undefined
  discharged_to_concept_id?: number | undefined
  preceding_visit_detail_id?: number | undefined
  parent_visit_detail_id?: number | undefined
  visit_occurrence_id: number
}
