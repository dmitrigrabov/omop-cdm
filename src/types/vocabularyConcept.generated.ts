import { z } from 'zod'

export const vocabularyConcept = z.object({
  id: z.number().int(),
  concept_name: z.string(),
  domain_id: z.string(),
  vocabulary_id: z.string(),
  concept_class_id: z.string(),
  standard_concept: z.string().optional(),
  concept_code: z.string(),
  valid_start_date: z.string(),
  valid_end_date: z.string(),
  invalid_reason: z.string().optional(),
})

export type VocabularyConcept = {
  id: number
  concept_name: string
  domain_id: string
  vocabulary_id: string
  concept_class_id: string
  standard_concept?: string | undefined
  concept_code: string
  valid_start_date: string
  valid_end_date: string
  invalid_reason?: string | undefined
}
