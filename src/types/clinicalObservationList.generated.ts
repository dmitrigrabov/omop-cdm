import {
  clinicalObservation,
  ClinicalObservation,
} from '@/types/clinicalObservation.generated.ts'
import { z } from 'zod'

export const clinicalObservationList = z.object({
  data: z.array(clinicalObservation),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalObservationList = {
  data: Array<ClinicalObservation>
  pagination: { total: number; offset: number; limit: number; count: number }
}
