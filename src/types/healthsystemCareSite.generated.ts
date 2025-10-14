import { z } from 'zod'

export const healthsystemCareSite = z.object({
  care_site_id: z.number().int(),
  care_site_name: z.string().optional(),
  place_of_service_concept_id: z.number().int().optional(),
  location_id: z.number().int().optional(),
  care_site_source_value: z.string().optional(),
  place_of_service_source_value: z.string().optional(),
})

export type HealthsystemCareSite = {
  care_site_id: number
  care_site_name?: string | undefined
  place_of_service_concept_id?: number | undefined
  location_id?: number | undefined
  care_site_source_value?: string | undefined
  place_of_service_source_value?: string | undefined
}
