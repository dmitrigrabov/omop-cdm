import {
  vocabularyConceptRelationship,
  VocabularyConceptRelationship,
} from '@/types/vocabularyConceptRelationship.generated.ts'
import { z } from 'zod'

export const vocabularyConceptRelationshipList = z.object({
  data: z.array(vocabularyConceptRelationship),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularyConceptRelationshipList = {
  data: Array<VocabularyConceptRelationship>
  pagination: { total: number; offset: number; limit: number; count: number }
}
