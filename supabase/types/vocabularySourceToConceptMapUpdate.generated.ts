import { z } from 'zod'

export const vocabularySourceToConceptMapUpdate = z.object({
  source_code: z.string().optional(),
  source_concept_id: z.number().int().optional(),
  source_vocabulary_id: z.string().optional(),
  source_code_description: z.string().optional(),
  target_concept_id: z.number().int().optional(),
  target_vocabulary_id: z.string().optional(),
  valid_start_date: z.string().optional(),
  valid_end_date: z.string().optional(),
  invalid_reason: z.string().optional(),
})

export type VocabularySourceToConceptMapUpdate = {
  source_code?: string | undefined
  source_concept_id?: number | undefined
  source_vocabulary_id?: string | undefined
  source_code_description?: string | undefined
  target_concept_id?: number | undefined
  target_vocabulary_id?: string | undefined
  valid_start_date?: string | undefined
  valid_end_date?: string | undefined
  invalid_reason?: string | undefined
}
