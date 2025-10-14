import { z } from 'zod'

export const resultsFactRelationship = z.object({
  relationship_concept_id: z.number().int(),
})

export type ResultsFactRelationship = { relationship_concept_id: number }
