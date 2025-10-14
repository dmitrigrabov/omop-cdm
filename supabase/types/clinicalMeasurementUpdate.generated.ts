import { z } from 'zod'

export const clinicalMeasurementUpdate = z.object({
  person_id: z.number().int().optional(),
  measurement_concept_id: z.number().int().optional(),
  measurement_date: z.string().optional(),
  measurement_datetime: z.string().optional(),
  measurement_time: z.string().optional(),
  measurement_type_concept_id: z.number().int().optional(),
  operator_concept_id: z.number().int().optional(),
  value_as_number: z.number().optional(),
  value_as_concept_id: z.number().int().optional(),
  unit_concept_id: z.number().int().optional(),
  range_low: z.number().optional(),
  range_high: z.number().optional(),
  provider_id: z.number().int().optional(),
  visit_occurrence_id: z.number().int().optional(),
  visit_detail_id: z.number().int().optional(),
  measurement_source_value: z.string().optional(),
  measurement_source_concept_id: z.number().int().optional(),
  unit_source_value: z.string().optional(),
  unit_source_concept_id: z.number().int().optional(),
  value_source_value: z.string().optional(),
  measurement_event_id: z.number().int().optional(),
  meas_event_field_concept_id: z.number().int().optional(),
})

export type ClinicalMeasurementUpdate = {
  person_id?: number | undefined
  measurement_concept_id?: number | undefined
  measurement_date?: string | undefined
  measurement_datetime?: string | undefined
  measurement_time?: string | undefined
  measurement_type_concept_id?: number | undefined
  operator_concept_id?: number | undefined
  value_as_number?: number | undefined
  value_as_concept_id?: number | undefined
  unit_concept_id?: number | undefined
  range_low?: number | undefined
  range_high?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  measurement_source_value?: string | undefined
  measurement_source_concept_id?: number | undefined
  unit_source_value?: string | undefined
  unit_source_concept_id?: number | undefined
  value_source_value?: string | undefined
  measurement_event_id?: number | undefined
  meas_event_field_concept_id?: number | undefined
}
