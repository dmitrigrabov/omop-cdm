import { z } from 'zod'

export type DerivedConditionEra = {
  condition_era_id: number
  person_id: number
  condition_concept_id: number
  condition_era_start_date: string
  condition_era_end_date: string
  condition_occurrence_count?: number | undefined
}

export const derivedConditionEra = z.object({
  condition_era_id: z.number().int(),
  person_id: z.number().int(),
  condition_concept_id: z.number().int(),
  condition_era_start_date: z.string(),
  condition_era_end_date: z.string(),
  condition_occurrence_count: z.number().int().optional(),
})
