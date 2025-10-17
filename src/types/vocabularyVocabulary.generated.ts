import { z } from 'zod'

export const vocabularyVocabulary = z.object({
  id: z.string(),
  vocabulary_name: z.string(),
  vocabulary_reference: z.string().optional(),
  vocabulary_version: z.string().optional(),
  vocabulary_concept_id: z.number().int(),
})

export type VocabularyVocabulary = {
  id: string
  vocabulary_name: string
  vocabulary_reference?: string | undefined
  vocabulary_version?: string | undefined
  vocabulary_concept_id: number
}
