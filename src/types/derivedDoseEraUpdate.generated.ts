import { z } from 'zod'

export const derivedDoseEraUpdate = z.object({
  person_id: z.number().int().optional(),
  drug_concept_id: z.number().int().optional(),
  unit_concept_id: z.number().int().optional(),
  dose_value: z.number().optional(),
  dose_era_start_date: z.string().optional(),
  dose_era_end_date: z.string().optional(),
})

export type DerivedDoseEraUpdate = {
  person_id?: number | undefined
  drug_concept_id?: number | undefined
  unit_concept_id?: number | undefined
  dose_value?: number | undefined
  dose_era_start_date?: string | undefined
  dose_era_end_date?: string | undefined
}
