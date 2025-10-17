import {
  clinicalMeasurement,
  ClinicalMeasurement,
} from '@/types/clinicalMeasurement.generated.ts'
import { z } from 'zod'

export const clinicalMeasurementList = z.object({
  data: z.array(clinicalMeasurement),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalMeasurementList = {
  data: Array<ClinicalMeasurement>
  pagination: { total: number; offset: number; limit: number; count: number }
}
