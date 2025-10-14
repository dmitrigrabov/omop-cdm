import { z } from 'zod'

export type ResultsFactRelationship = { relationship_concept_id: number }

export const resultsFactRelationship = z.object({
  relationship_concept_id: z.number().int(),
})
