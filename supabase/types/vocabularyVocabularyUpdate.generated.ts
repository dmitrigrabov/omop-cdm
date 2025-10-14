import { z } from 'zod'

export const vocabularyVocabularyUpdate = z.object({
  vocabulary_name: z.string().optional(),
  vocabulary_reference: z.string().optional(),
  vocabulary_version: z.string().optional(),
  vocabulary_concept_id: z.number().int().optional(),
})

export type VocabularyVocabularyUpdate = {
  vocabulary_name?: string | undefined
  vocabulary_reference?: string | undefined
  vocabulary_version?: string | undefined
  vocabulary_concept_id?: number | undefined
}
