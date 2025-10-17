import { z } from 'zod'

export const healthsystemProvider = z.object({
  id: z.number().int(),
  provider_name: z.string().optional(),
  npi: z.string().optional(),
  dea: z.string().optional(),
  specialty_concept_id: z.number().int().optional(),
  care_site_id: z.number().int().optional(),
  year_of_birth: z.number().int().optional(),
  gender_concept_id: z.number().int().optional(),
  provider_source_value: z.string().optional(),
  specialty_source_value: z.string().optional(),
  specialty_source_concept_id: z.number().int().optional(),
  gender_source_value: z.string().optional(),
  gender_source_concept_id: z.number().int().optional(),
})

export type HealthsystemProvider = {
  id: number
  provider_name?: string | undefined
  npi?: string | undefined
  dea?: string | undefined
  specialty_concept_id?: number | undefined
  care_site_id?: number | undefined
  year_of_birth?: number | undefined
  gender_concept_id?: number | undefined
  provider_source_value?: string | undefined
  specialty_source_value?: string | undefined
  specialty_source_concept_id?: number | undefined
  gender_source_value?: string | undefined
  gender_source_concept_id?: number | undefined
}
