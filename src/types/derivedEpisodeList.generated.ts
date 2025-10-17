import {
  derivedEpisode,
  DerivedEpisode,
} from '@/types/derivedEpisode.generated.ts'
import { z } from 'zod'

export const derivedEpisodeList = z.object({
  data: z.array(derivedEpisode),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type DerivedEpisodeList = {
  data: Array<DerivedEpisode>
  pagination: { total: number; offset: number; limit: number; count: number }
}
