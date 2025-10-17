import {
  vocabularyConceptAncestor,
  VocabularyConceptAncestor,
} from '@/types/vocabularyConceptAncestor.generated.ts'
import { z } from 'zod'

export const vocabularyConceptAncestorList = z.object({
  data: z.array(vocabularyConceptAncestor),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularyConceptAncestorList = {
  data: Array<VocabularyConceptAncestor>
  pagination: { total: number; offset: number; limit: number; count: number }
}
