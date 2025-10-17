import {
  metadataCdmSource,
  MetadataCdmSource,
} from '@/types/metadataCdmSource.generated.ts'
import { z } from 'zod'

export const metadataCdmSourceList = z.object({
  data: z.array(metadataCdmSource),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type MetadataCdmSourceList = {
  data: Array<MetadataCdmSource>
  pagination: { total: number; offset: number; limit: number; count: number }
}
