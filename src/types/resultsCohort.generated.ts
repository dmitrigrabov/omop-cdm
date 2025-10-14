import { z } from 'zod'

export const resultsCohort = z.object({
  cohort_definition_id: z.number().int(),
  subject_id: z.number().int(),
  cohort_start_date: z.string(),
  cohort_end_date: z.string(),
})

export type ResultsCohort = {
  cohort_definition_id: number
  subject_id: number
  cohort_start_date: string
  cohort_end_date: string
}
