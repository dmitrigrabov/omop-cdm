import {
  vocabularyRelationship,
  VocabularyRelationship,
} from '@/types/vocabularyRelationship.generated.ts'
import { z } from 'zod'

export const vocabularyRelationshipList = z.object({
  data: z.array(vocabularyRelationship),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularyRelationshipList = {
  data: Array<VocabularyRelationship>
  pagination: { total: number; offset: number; limit: number; count: number }
}
