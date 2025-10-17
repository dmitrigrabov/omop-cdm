import {
  clinicalDeviceExposure,
  ClinicalDeviceExposure,
} from '@/types/clinicalDeviceExposure.generated.ts'
import { z } from 'zod'

export const clinicalDeviceExposureList = z.object({
  data: z.array(clinicalDeviceExposure),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalDeviceExposureList = {
  data: Array<ClinicalDeviceExposure>
  pagination: { total: number; offset: number; limit: number; count: number }
}
