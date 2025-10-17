import {
  vocabularyConceptClass,
  VocabularyConceptClass,
} from '@/types/vocabularyConceptClass.generated.ts'
import { z } from 'zod'

export const vocabularyConceptClassList = z.object({
  data: z.array(vocabularyConceptClass),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularyConceptClassList = {
  data: Array<VocabularyConceptClass>
  pagination: { total: number; offset: number; limit: number; count: number }
}
