import { z } from 'zod'

export const derivedDoseEraCreate = z.object({
  person_id: z.number().int(),
  drug_concept_id: z.number().int(),
  unit_concept_id: z.number().int(),
  dose_value: z.number(),
  dose_era_start_date: z.string(),
  dose_era_end_date: z.string(),
})

export type DerivedDoseEraCreate = {
  person_id: number
  drug_concept_id: number
  unit_concept_id: number
  dose_value: number
  dose_era_start_date: string
  dose_era_end_date: string
}
