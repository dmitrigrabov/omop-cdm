import { z } from 'zod'

export type VocabularyDomain = {
  domain_id: string
  domain_name: string
  domain_concept_id: number
}

export const vocabularyDomain = z.object({
  domain_id: z.string(),
  domain_name: z.string(),
  domain_concept_id: z.number().int(),
})
