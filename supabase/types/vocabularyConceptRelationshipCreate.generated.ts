import { z } from 'zod'

export const vocabularyConceptRelationshipCreate = z.object({
  relationship_id: z.string(),
  valid_start_date: z.string(),
  valid_end_date: z.string(),
  invalid_reason: z.string().optional(),
})

export type VocabularyConceptRelationshipCreate = {
  relationship_id: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}
