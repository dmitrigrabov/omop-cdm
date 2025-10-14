import { z } from 'zod'

export const clinicalDeviceExposureUpdate = z.object({
  person_id: z.number().int().optional(),
  device_concept_id: z.number().int().optional(),
  device_exposure_start_date: z.string().optional(),
  device_exposure_start_datetime: z.string().optional(),
  device_exposure_end_date: z.string().optional(),
  device_exposure_end_datetime: z.string().optional(),
  device_type_concept_id: z.number().int().optional(),
  unique_device_id: z.string().optional(),
  production_id: z.string().optional(),
  quantity: z.number().int().optional(),
  provider_id: z.number().int().optional(),
  visit_occurrence_id: z.number().int().optional(),
  visit_detail_id: z.number().int().optional(),
  device_source_value: z.string().optional(),
  device_source_concept_id: z.number().int().optional(),
  unit_concept_id: z.number().int().optional(),
  unit_source_value: z.string().optional(),
  unit_source_concept_id: z.number().int().optional(),
})

export type ClinicalDeviceExposureUpdate = {
  person_id?: number | undefined
  device_concept_id?: number | undefined
  device_exposure_start_date?: string | undefined
  device_exposure_start_datetime?: string | undefined
  device_exposure_end_date?: string | undefined
  device_exposure_end_datetime?: string | undefined
  device_type_concept_id?: number | undefined
  unique_device_id?: string | undefined
  production_id?: string | undefined
  quantity?: number | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  device_source_value?: string | undefined
  device_source_concept_id?: number | undefined
  unit_concept_id?: number | undefined
  unit_source_value?: string | undefined
  unit_source_concept_id?: number | undefined
}
