import {
  metadataMetadata,
  MetadataMetadata,
} from '@/types/metadataMetadata.generated.ts'
import { z } from 'zod'

export const metadataMetadataList = z.object({
  data: z.array(metadataMetadata),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type MetadataMetadataList = {
  data: Array<MetadataMetadata>
  pagination: { total: number; offset: number; limit: number; count: number }
}
