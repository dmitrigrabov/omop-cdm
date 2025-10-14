import { z } from 'zod'

export const resultsCohortDefinition = z.object({
  cohort_definition_id: z.number().int(),
  cohort_definition_name: z.string(),
  cohort_definition_description: z.string().optional(),
  definition_type_concept_id: z.number().int(),
  cohort_definition_syntax: z.string().optional(),
  subject_concept_id: z.number().int(),
  cohort_initiation_date: z.string().optional(),
})

export type ResultsCohortDefinition = {
  cohort_definition_id: number
  cohort_definition_name: string
  cohort_definition_description?: string | undefined
  definition_type_concept_id: number
  cohort_definition_syntax?: string | undefined
  subject_concept_id: number
  cohort_initiation_date?: string | undefined
}
