import { z } from 'zod'

export const clinicalPersonCreate = z.object({
  gender_concept_id: z.number().int(),
  year_of_birth: z.number().int(),
  month_of_birth: z.number().int().optional(),
  day_of_birth: z.number().int().optional(),
  birth_datetime: z.string().optional(),
  race_concept_id: z.number().int(),
  ethnicity_concept_id: z.number().int(),
  location_id: z.number().int().optional(),
  provider_id: z.number().int().optional(),
  care_site_id: z.number().int().optional(),
  person_source_value: z.string().optional(),
  gender_source_value: z.string().optional(),
  gender_source_concept_id: z.number().int().optional(),
  race_source_value: z.string().optional(),
  race_source_concept_id: z.number().int().optional(),
  ethnicity_source_value: z.string().optional(),
  ethnicity_source_concept_id: z.number().int().optional(),
})

export type ClinicalPersonCreate = {
  gender_concept_id: number
  year_of_birth: number
  month_of_birth?: number | undefined
  day_of_birth?: number | undefined
  birth_datetime?: string | undefined
  race_concept_id: number
  ethnicity_concept_id: number
  location_id?: number | undefined
  provider_id?: number | undefined
  care_site_id?: number | undefined
  person_source_value?: string | undefined
  gender_source_value?: string | undefined
  gender_source_concept_id?: number | undefined
  race_source_value?: string | undefined
  race_source_concept_id?: number | undefined
  ethnicity_source_value?: string | undefined
  ethnicity_source_concept_id?: number | undefined
}
