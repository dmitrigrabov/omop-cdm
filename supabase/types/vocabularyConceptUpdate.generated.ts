import { z } from 'zod'

export const vocabularyConceptUpdate = z.object({
  concept_name: z.string().optional(),
  domain_id: z.string().optional(),
  vocabulary_id: z.string().optional(),
  concept_class_id: z.string().optional(),
  standard_concept: z.string().optional(),
  concept_code: z.string().optional(),
  valid_start_date: z.string().optional(),
  valid_end_date: z.string().optional(),
  invalid_reason: z.string().optional(),
})

export type VocabularyConceptUpdate = {
  concept_name?: string | undefined
  domain_id?: string | undefined
  vocabulary_id?: string | undefined
  concept_class_id?: string | undefined
  standard_concept?: string | undefined
  concept_code?: string | undefined
  valid_start_date?: string | undefined
  valid_end_date?: string | undefined
  invalid_reason?: string | undefined
}
