import {
  derivedEpisodeEvent,
  DerivedEpisodeEvent,
} from '@/types/derivedEpisodeEvent.generated.ts'
import { z } from 'zod'

export const derivedEpisodeEventList = z.object({
  data: z.array(derivedEpisodeEvent),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type DerivedEpisodeEventList = {
  data: Array<DerivedEpisodeEvent>
  pagination: { total: number; offset: number; limit: number; count: number }
}
