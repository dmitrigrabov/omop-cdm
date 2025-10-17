import {
  clinicalVisitDetail,
  ClinicalVisitDetail,
} from '@/types/clinicalVisitDetail.generated.ts'
import { z } from 'zod'

export const clinicalVisitDetailList = z.object({
  data: z.array(clinicalVisitDetail),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type ClinicalVisitDetailList = {
  data: Array<ClinicalVisitDetail>
  pagination: { total: number; offset: number; limit: number; count: number }
}
