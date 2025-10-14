import { z } from 'zod'

export type VocabularyDrugStrength = {
  drug_concept_id: number
  ingredient_concept_id: number
  amount_value?: number | undefined
  amount_unit_concept_id?: number | undefined
  numerator_value?: number | undefined
  numerator_unit_concept_id?: number | undefined
  denominator_value?: number | undefined
  denominator_unit_concept_id?: number | undefined
  box_size?: number | undefined
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}

export const vocabularyDrugStrength = z.object({
  drug_concept_id: z.number().int(),
  ingredient_concept_id: z.number().int(),
  amount_value: z.number().optional(),
  amount_unit_concept_id: z.number().int().optional(),
  numerator_value: z.number().optional(),
  numerator_unit_concept_id: z.number().int().optional(),
  denominator_value: z.number().optional(),
  denominator_unit_concept_id: z.number().int().optional(),
  box_size: z.number().int().optional(),
  valid_start_date: z.string(),
  valid_end_date: z.string(),
  invalid_reason: z.string().optional(),
})
