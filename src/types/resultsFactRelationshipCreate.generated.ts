import { z } from 'zod'

export const resultsFactRelationshipCreate = z.object({
  relationship_concept_id: z.number().int(),
})

export type ResultsFactRelationshipCreate = { relationship_concept_id: number }
