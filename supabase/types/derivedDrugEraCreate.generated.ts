import { z } from 'zod'

export const derivedDrugEraCreate = z.object({
  person_id: z.number().int(),
  drug_concept_id: z.number().int(),
  drug_era_start_date: z.string(),
  drug_era_end_date: z.string(),
  drug_exposure_count: z.number().int().optional(),
  gap_days: z.number().int().optional(),
})

export type DerivedDrugEraCreate = {
  person_id: number
  drug_concept_id: number
  drug_era_start_date: string
  drug_era_end_date: string
  drug_exposure_count?: number | undefined
  gap_days?: number | undefined
}
