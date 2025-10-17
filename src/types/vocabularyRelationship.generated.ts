import { z } from 'zod'

export const vocabularyRelationship = z.object({
  id: z.string(),
  relationship_name: z.string(),
  is_hierarchical: z.string(),
  defines_ancestry: z.string(),
  reverse_relationship_id: z.string(),
  relationship_concept_id: z.number().int(),
})

export type VocabularyRelationship = {
  id: string
  relationship_name: string
  is_hierarchical: string
  defines_ancestry: string
  reverse_relationship_id: string
  relationship_concept_id: number
}
