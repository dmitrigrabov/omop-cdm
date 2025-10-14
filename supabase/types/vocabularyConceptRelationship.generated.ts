import { z } from 'zod'

export type VocabularyConceptRelationship = {
  relationship_id: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}

export const vocabularyConceptRelationship = z.object({
  relationship_id: z.string(),
  valid_start_date: z.string(),
  valid_end_date: z.string(),
  invalid_reason: z.string().optional(),
})
