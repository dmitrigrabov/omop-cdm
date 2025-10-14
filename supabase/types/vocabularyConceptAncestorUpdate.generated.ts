import { z } from 'zod'

export const vocabularyConceptAncestorUpdate = z.object({
  ancestor_concept_id: z.number().int().optional(),
  descendant_concept_id: z.number().int().optional(),
  min_levels_of_separation: z.number().int().optional(),
  max_levels_of_separation: z.number().int().optional(),
})

export type VocabularyConceptAncestorUpdate = {
  ancestor_concept_id?: number | undefined
  descendant_concept_id?: number | undefined
  min_levels_of_separation?: number | undefined
  max_levels_of_separation?: number | undefined
}
