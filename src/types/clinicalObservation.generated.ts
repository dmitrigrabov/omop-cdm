import { z } from 'zod'

export const clinicalObservation = z.object({
  id: z.number().int(),
  person_id: z.number().int(),
  observation_concept_id: z.number().int(),
  observation_date: z.string(),
  observation_datetime: z.string().optional(),
  observation_type_concept_id: z.number().int(),
  value_as_number: z.number().optional(),
  value_as_string: z.string().optional(),
  value_as_concept_id: z.number().int().optional(),
  qualifier_concept_id: z.number().int().optional(),
  unit_concept_id: z.number().int().optional(),
  provider_id: z.number().int().optional(),
  visit_occurrence_id: z.number().int().optional(),
  visit_detail_id: z.number().int().optional(),
  observation_source_value: z.string().optional(),
  observation_source_concept_id: z.number().int().optional(),
  unit_source_value: z.string().optional(),
  qualifier_source_value: z.string().optional(),
  value_source_value: z.string().optional(),
  observation_event_id: z.number().int().optional(),
  obs_event_field_concept_id: z.number().int().optional(),
})

export type ClinicalObservation = {
  id: number
  person_id: number
  observation_concept_id: number
  observation_date: string
  observation_datetime?: string | undefined
  observation_type_concept_id: number
  value_as_number?: number | undefined
  value_as_string?: string | undefined
  value_as_concept_id?: number | undefined
  qualifier_concept_id?: number | undefined
  unit_concept_id?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  observation_source_value?: string | undefined
  observation_source_concept_id?: number | undefined
  unit_source_value?: string | undefined
  qualifier_source_value?: string | undefined
  value_source_value?: string | undefined
  observation_event_id?: number | undefined
  obs_event_field_concept_id?: number | undefined
}
