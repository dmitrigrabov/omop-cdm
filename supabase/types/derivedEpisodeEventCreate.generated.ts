import { z } from 'zod'

export const derivedEpisodeEventCreate = z.object({
  episode_id: z.number().int(),
  event_id: z.number().int(),
  episode_event_field_concept_id: z.number().int(),
})

export type DerivedEpisodeEventCreate = {
  episode_id: number
  event_id: number
  episode_event_field_concept_id: number
}
