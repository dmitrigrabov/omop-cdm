import { z } from 'zod'

export const vocabularyConceptSynonymCreate = z.object({
  concept_id: z.number().int(),
  concept_synonym_name: z.string(),
  language_concept_id: z.number().int(),
})

export type VocabularyConceptSynonymCreate = {
  concept_id: number
  concept_synonym_name: string
  language_concept_id: number
}
