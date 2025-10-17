import {
  clinicalDrugExposure,
  ClinicalDrugExposure,
} from '@/types/clinicalDrugExposure.generated.ts'
import { z } from 'zod'

export const clinicalDrugExposureList = z.object({
  data: z.array(clinicalDrugExposure),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalDrugExposureList = {
  data: Array<ClinicalDrugExposure>
  pagination: { total: number; offset: number; limit: number; count: number }
}
