import {
  resultsFactRelationship,
  ResultsFactRelationship,
} from '@/types/resultsFactRelationship.generated.ts'
import { z } from 'zod'

export const resultsFactRelationshipList = z.object({
  data: z.array(resultsFactRelationship),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ResultsFactRelationshipList = {
  data: Array<ResultsFactRelationship>
  pagination: { total: number; offset: number; limit: number; count: number }
}
