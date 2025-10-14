import { z } from 'zod'

export const vocabularyConceptClassUpdate = z.object({
  concept_class_name: z.string().optional(),
  concept_class_concept_id: z.number().int().optional(),
})

export type VocabularyConceptClassUpdate = {
  concept_class_name?: string | undefined
  concept_class_concept_id?: number | undefined
}
