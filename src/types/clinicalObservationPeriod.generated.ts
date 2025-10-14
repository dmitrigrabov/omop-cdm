import { z } from 'zod'

export const clinicalObservationPeriod = z.object({
  observation_period_id: z.number().int(),
  person_id: z.number().int(),
  observation_period_start_date: z.string(),
  observation_period_end_date: z.string(),
  period_type_concept_id: z.number().int(),
})

export type ClinicalObservationPeriod = {
  observation_period_id: number
  person_id: number
  observation_period_start_date: string
  observation_period_end_date: string
  period_type_concept_id: number
}
