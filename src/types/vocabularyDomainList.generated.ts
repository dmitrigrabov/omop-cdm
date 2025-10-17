import {
  vocabularyDomain,
  VocabularyDomain,
} from '@/types/vocabularyDomain.generated.ts'
import { z } from 'zod'

export const vocabularyDomainList = z.object({
  data: z.array(vocabularyDomain),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type VocabularyDomainList = {
  data: Array<VocabularyDomain>
  pagination: { total: number; offset: number; limit: number; count: number }
}
