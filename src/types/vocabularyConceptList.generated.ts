import {
  vocabularyConcept,
  VocabularyConcept,
} from '@/types/vocabularyConcept.generated.ts'
import { z } from 'zod'

export const vocabularyConceptList = z.object({
  data: z.array(vocabularyConcept),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularyConceptList = {
  data: Array<VocabularyConcept>
  pagination: { total: number; offset: number; limit: number; count: number }
}
