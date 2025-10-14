import { z } from 'zod'

export const vocabularySourceToConceptMapCreate = z.object({
  source_code: z.string(),
  source_concept_id: z.number().int(),
  source_vocabulary_id: z.string(),
  source_code_description: z.string().optional(),
  target_concept_id: z.number().int(),
  target_vocabulary_id: z.string(),
  valid_start_date: z.string(),
  valid_end_date: z.string(),
  invalid_reason: z.string().optional(),
})

export type VocabularySourceToConceptMapCreate = {
  source_code: string
  source_concept_id: number
  source_vocabulary_id: string
  source_code_description?: string | undefined
  target_concept_id: number
  target_vocabulary_id: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}
