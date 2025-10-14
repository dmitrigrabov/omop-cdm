import { z } from 'zod'

export const vocabularyConceptClass = z.object({
  concept_class_id: z.string(),
  concept_class_name: z.string(),
  concept_class_concept_id: z.number().int(),
})

export type VocabularyConceptClass = {
  concept_class_id: string
  concept_class_name: string
  concept_class_concept_id: number
}
