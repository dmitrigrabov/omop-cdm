import { z } from 'zod'

export const clinicalDeathCreate = z.object({
  person_id: z.number().int(),
  death_date: z.string(),
  death_datetime: z.string().optional(),
  death_type_concept_id: z.number().int().optional(),
  cause_concept_id: z.number().int().optional(),
  cause_source_value: z.string().optional(),
  cause_source_concept_id: z.number().int().optional(),
})

export type ClinicalDeathCreate = {
  person_id: number
  death_date: string
  death_datetime?: string | undefined
  death_type_concept_id?: number | undefined
  cause_concept_id?: number | undefined
  cause_source_value?: string | undefined
  cause_source_concept_id?: number | undefined
}
