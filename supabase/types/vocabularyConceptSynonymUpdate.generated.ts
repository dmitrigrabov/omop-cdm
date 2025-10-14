import { z } from 'zod'

export const vocabularyConceptSynonymUpdate = z.object({
  concept_id: z.number().int().optional(),
  concept_synonym_name: z.string().optional(),
  language_concept_id: z.number().int().optional(),
})

export type VocabularyConceptSynonymUpdate = {
  concept_id?: number | undefined
  concept_synonym_name?: string | undefined
  language_concept_id?: number | undefined
}
