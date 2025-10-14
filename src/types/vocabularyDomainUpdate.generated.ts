import { z } from 'zod'

export const vocabularyDomainUpdate = z.object({
  domain_name: z.string().optional(),
  domain_concept_id: z.number().int().optional(),
})

export type VocabularyDomainUpdate = {
  domain_name?: string | undefined
  domain_concept_id?: number | undefined
}
