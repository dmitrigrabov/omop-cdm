import { z } from 'zod'

export const vocabularyConceptRelationshipUpdate = z.object({
  relationship_id: z.string().optional(),
  valid_start_date: z.string().optional(),
  valid_end_date: z.string().optional(),
  invalid_reason: z.string().optional(),
})

export type VocabularyConceptRelationshipUpdate = {
  relationship_id?: string | undefined
  valid_start_date?: string | undefined
  valid_end_date?: string | undefined
  invalid_reason?: string | undefined
}
