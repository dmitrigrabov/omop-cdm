import { z } from 'zod'

export const vocabularyDomainCreate = z.object({
  domain_name: z.string(),
  domain_concept_id: z.number().int(),
})

export type VocabularyDomainCreate = {
  domain_name: string
  domain_concept_id: number
}
