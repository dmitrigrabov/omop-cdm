import { z } from 'zod'

export const resultsFactRelationshipUpdate = z.object({
  relationship_concept_id: z.number().int().optional(),
})

export type ResultsFactRelationshipUpdate = {
  relationship_concept_id?: number | undefined
}
