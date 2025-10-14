import { z } from 'zod'

export const vocabularyDrugStrengthUpdate = z.object({
  drug_concept_id: z.number().int().optional(),
  ingredient_concept_id: z.number().int().optional(),
  amount_value: z.number().optional(),
  amount_unit_concept_id: z.number().int().optional(),
  numerator_value: z.number().optional(),
  numerator_unit_concept_id: z.number().int().optional(),
  denominator_value: z.number().optional(),
  denominator_unit_concept_id: z.number().int().optional(),
  box_size: z.number().int().optional(),
  valid_start_date: z.string().optional(),
  valid_end_date: z.string().optional(),
  invalid_reason: z.string().optional(),
})

export type VocabularyDrugStrengthUpdate = {
  drug_concept_id?: number | undefined
  ingredient_concept_id?: number | undefined
  amount_value?: number | undefined
  amount_unit_concept_id?: number | undefined
  numerator_value?: number | undefined
  numerator_unit_concept_id?: number | undefined
  denominator_value?: number | undefined
  denominator_unit_concept_id?: number | undefined
  box_size?: number | undefined
  valid_start_date?: string | undefined
  valid_end_date?: string | undefined
  invalid_reason?: string | undefined
}
