import {
  clinicalObservationPeriod,
  ClinicalObservationPeriod,
} from '@/types/clinicalObservationPeriod.generated.ts'
import { z } from 'zod'

export const clinicalObservationPeriodList = z.object({
  data: z.array(clinicalObservationPeriod),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalObservationPeriodList = {
  data: Array<ClinicalObservationPeriod>
  pagination: { total: number; offset: number; limit: number; count: number }
}
