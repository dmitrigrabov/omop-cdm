import {
  vocabularyVocabulary,
  VocabularyVocabulary,
} from '@/types/vocabularyVocabulary.generated.ts'
import { z } from 'zod'

export const vocabularyVocabularyList = z.object({
  data: z.array(vocabularyVocabulary),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularyVocabularyList = {
  data: Array<VocabularyVocabulary>
  pagination: { total: number; offset: number; limit: number; count: number }
}
