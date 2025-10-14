import { z } from 'zod'

export const derivedDrugEraUpdate = z.object({
  person_id: z.number().int().optional(),
  drug_concept_id: z.number().int().optional(),
  drug_era_start_date: z.string().optional(),
  drug_era_end_date: z.string().optional(),
  drug_exposure_count: z.number().int().optional(),
  gap_days: z.number().int().optional(),
})

export type DerivedDrugEraUpdate = {
  person_id?: number | undefined
  drug_concept_id?: number | undefined
  drug_era_start_date?: string | undefined
  drug_era_end_date?: string | undefined
  drug_exposure_count?: number | undefined
  gap_days?: number | undefined
}
