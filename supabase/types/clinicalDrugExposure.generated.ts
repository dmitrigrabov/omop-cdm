import { z } from 'zod'

export type ClinicalDrugExposure = {
  drug_exposure_id: number
  person_id: number
  drug_concept_id: number
  drug_exposure_start_date: string
  drug_exposure_start_datetime?: string | undefined
  drug_exposure_end_date: string
  drug_exposure_end_datetime?: string | undefined
  verbatim_end_date?: string | undefined
  drug_type_concept_id: number
  stop_reason?: string | undefined
  refills?: number | undefined
  quantity?: number | undefined
  days_supply?: number | undefined
  sig?: string | undefined
  route_concept_id?: number | undefined
  lot_number?: string | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  drug_source_value?: string | undefined
  drug_source_concept_id?: number | undefined
  route_source_value?: string | undefined
  dose_unit_source_value?: string | undefined
}

export const clinicalDrugExposure = z.object({
  drug_exposure_id: z.number().int(),
  person_id: z.number().int(),
  drug_concept_id: z.number().int(),
  drug_exposure_start_date: z.string(),
  drug_exposure_start_datetime: z.string().optional(),
  drug_exposure_end_date: z.string(),
  drug_exposure_end_datetime: z.string().optional(),
  verbatim_end_date: z.string().optional(),
  drug_type_concept_id: z.number().int(),
  stop_reason: z.string().optional(),
  refills: z.number().int().optional(),
  quantity: z.number().optional(),
  days_supply: z.number().int().optional(),
  sig: z.string().optional(),
  route_concept_id: z.number().int().optional(),
  lot_number: z.string().optional(),
  provider_id: z.number().int().optional(),
  visit_occurrence_id: z.number().int().optional(),
  visit_detail_id: z.number().int().optional(),
  drug_source_value: z.string().optional(),
  drug_source_concept_id: z.number().int().optional(),
  route_source_value: z.string().optional(),
  dose_unit_source_value: z.string().optional(),
})
