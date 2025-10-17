import {
  vocabularySourceToConceptMap,
  VocabularySourceToConceptMap,
} from '@/types/vocabularySourceToConceptMap.generated.ts'
import { z } from 'zod'

export const vocabularySourceToConceptMapList = z.object({
  data: z.array(vocabularySourceToConceptMap),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularySourceToConceptMapList = {
  data: Array<VocabularySourceToConceptMap>
  pagination: { total: number; offset: number; limit: number; count: number }
}
