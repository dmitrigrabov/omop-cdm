import { z } from 'zod'

export const vocabularyRelationshipUpdate = z.object({
  relationship_name: z.string().optional(),
  is_hierarchical: z.string().optional(),
  defines_ancestry: z.string().optional(),
  reverse_relationship_id: z.string().optional(),
  relationship_concept_id: z.number().int().optional(),
})

export type VocabularyRelationshipUpdate = {
  relationship_name?: string | undefined
  is_hierarchical?: string | undefined
  defines_ancestry?: string | undefined
  reverse_relationship_id?: string | undefined
  relationship_concept_id?: number | undefined
}
