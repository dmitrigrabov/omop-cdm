import { z } from 'zod'

export type VocabularyConceptAncestor = {
  ancestor_concept_id: number
  descendant_concept_id: number
  min_levels_of_separation: number
  max_levels_of_separation: number
}

export const vocabularyConceptAncestor = z.object({
  ancestor_concept_id: z.number().int(),
  descendant_concept_id: z.number().int(),
  min_levels_of_separation: z.number().int(),
  max_levels_of_separation: z.number().int(),
})
