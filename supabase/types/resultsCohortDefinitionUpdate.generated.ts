import { z } from 'zod'

export const resultsCohortDefinitionUpdate = z.object({
  cohort_definition_id: z.number().int().optional(),
  cohort_definition_name: z.string().optional(),
  cohort_definition_description: z.string().optional(),
  definition_type_concept_id: z.number().int().optional(),
  cohort_definition_syntax: z.string().optional(),
  subject_concept_id: z.number().int().optional(),
  cohort_initiation_date: z.string().optional(),
})

export type ResultsCohortDefinitionUpdate = {
  cohort_definition_id?: number | undefined
  cohort_definition_name?: string | undefined
  cohort_definition_description?: string | undefined
  definition_type_concept_id?: number | undefined
  cohort_definition_syntax?: string | undefined
  subject_concept_id?: number | undefined
  cohort_initiation_date?: string | undefined
}
