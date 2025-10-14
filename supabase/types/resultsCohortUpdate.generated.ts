import { z } from 'zod'

export const resultsCohortUpdate = z.object({
  cohort_definition_id: z.number().int().optional(),
  subject_id: z.number().int().optional(),
  cohort_start_date: z.string().optional(),
  cohort_end_date: z.string().optional(),
})

export type ResultsCohortUpdate = {
  cohort_definition_id?: number | undefined
  subject_id?: number | undefined
  cohort_start_date?: string | undefined
  cohort_end_date?: string | undefined
}
