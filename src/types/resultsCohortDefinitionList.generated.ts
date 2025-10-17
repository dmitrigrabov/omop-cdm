import {
  resultsCohortDefinition,
  ResultsCohortDefinition,
} from '@/types/resultsCohortDefinition.generated.ts'
import { z } from 'zod'

export const resultsCohortDefinitionList = z.object({
  data: z.array(resultsCohortDefinition),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ResultsCohortDefinitionList = {
  data: Array<ResultsCohortDefinition>
  pagination: { total: number; offset: number; limit: number; count: number }
}
