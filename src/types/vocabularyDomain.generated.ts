import { z } from 'zod'

export const vocabularyDomain = z.object({
  id: z.string(),
  domain_name: z.string(),
  domain_concept_id: z.number().int(),
})

export type VocabularyDomain = {
  id: string
  domain_name: string
  domain_concept_id: number
}
