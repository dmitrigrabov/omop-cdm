import {
  resultsCohort,
  ResultsCohort,
} from '@/types/resultsCohort.generated.ts'
import { z } from 'zod'

export const resultsCohortList = z.object({
  data: z.array(resultsCohort),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ResultsCohortList = {
  data: Array<ResultsCohort>
  pagination: { total: number; offset: number; limit: number; count: number }
}
