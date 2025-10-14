import { z } from 'zod'

export const healthsystemLocation = z.object({
  location_id: z.number().int(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  county: z.string().optional(),
  location_source_value: z.string().optional(),
  country_concept_id: z.number().int().optional(),
  country_source_value: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
})

export type HealthsystemLocation = {
  location_id: number
  city?: string | undefined
  state?: string | undefined
  zip?: string | undefined
  county?: string | undefined
  location_source_value?: string | undefined
  country_concept_id?: number | undefined
  country_source_value?: string | undefined
  latitude?: number | undefined
  longitude?: number | undefined
}
