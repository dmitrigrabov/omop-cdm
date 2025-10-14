import { z } from 'zod'

export const vocabularyConceptClassCreate = z.object({
  concept_class_name: z.string(),
  concept_class_concept_id: z.number().int(),
})

export type VocabularyConceptClassCreate = {
  concept_class_name: string
  concept_class_concept_id: number
}
