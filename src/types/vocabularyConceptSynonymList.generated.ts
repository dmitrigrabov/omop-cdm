import {
  vocabularyConceptSynonym,
  VocabularyConceptSynonym,
} from '@/types/vocabularyConceptSynonym.generated.ts'
import { z } from 'zod'

export const vocabularyConceptSynonymList = z.object({
  data: z.array(vocabularyConceptSynonym),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularyConceptSynonymList = {
  data: Array<VocabularyConceptSynonym>
  pagination: { total: number; offset: number; limit: number; count: number }
}
