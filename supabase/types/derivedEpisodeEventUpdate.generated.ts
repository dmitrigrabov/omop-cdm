import { z } from 'zod'

export const derivedEpisodeEventUpdate = z.object({
  episode_id: z.number().int().optional(),
  event_id: z.number().int().optional(),
  episode_event_field_concept_id: z.number().int().optional(),
})

export type DerivedEpisodeEventUpdate = {
  episode_id?: number | undefined
  event_id?: number | undefined
  episode_event_field_concept_id?: number | undefined
}
