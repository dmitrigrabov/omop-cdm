import { z } from 'zod'

export const clinicalObservationPeriodUpdate = z.object({
  person_id: z.number().int().optional(),
  observation_period_start_date: z.string().optional(),
  observation_period_end_date: z.string().optional(),
  period_type_concept_id: z.number().int().optional(),
})

export type ClinicalObservationPeriodUpdate = {
  person_id?: number | undefined
  observation_period_start_date?: string | undefined
  observation_period_end_date?: string | undefined
  period_type_concept_id?: number | undefined
}
