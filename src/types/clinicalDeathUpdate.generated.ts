import { z } from 'zod'

export const clinicalDeathUpdate = z.object({
  person_id: z.number().int().optional(),
  death_date: z.string().optional(),
  death_datetime: z.string().optional(),
  death_type_concept_id: z.number().int().optional(),
  cause_concept_id: z.number().int().optional(),
  cause_source_value: z.string().optional(),
  cause_source_concept_id: z.number().int().optional(),
})

export type ClinicalDeathUpdate = {
  person_id?: number | undefined
  death_date?: string | undefined
  death_datetime?: string | undefined
  death_type_concept_id?: number | undefined
  cause_concept_id?: number | undefined
  cause_source_value?: string | undefined
  cause_source_concept_id?: number | undefined
}
