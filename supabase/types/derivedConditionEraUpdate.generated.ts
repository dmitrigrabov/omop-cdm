import { z } from 'zod'

export const derivedConditionEraUpdate = z.object({
  person_id: z.number().int().optional(),
  condition_concept_id: z.number().int().optional(),
  condition_era_start_date: z.string().optional(),
  condition_era_end_date: z.string().optional(),
  condition_occurrence_count: z.number().int().optional(),
})

export type DerivedConditionEraUpdate = {
  person_id?: number | undefined
  condition_concept_id?: number | undefined
  condition_era_start_date?: string | undefined
  condition_era_end_date?: string | undefined
  condition_occurrence_count?: number | undefined
}
