import { z } from 'zod'

export const derivedEpisodeUpdate = z.object({
  person_id: z.number().int().optional(),
  episode_concept_id: z.number().int().optional(),
  episode_start_date: z.string().optional(),
  episode_start_datetime: z.string().optional(),
  episode_end_date: z.string().optional(),
  episode_end_datetime: z.string().optional(),
  episode_parent_id: z.number().int().optional(),
  episode_number: z.number().int().optional(),
  episode_object_concept_id: z.number().int().optional(),
  episode_type_concept_id: z.number().int().optional(),
  episode_source_value: z.string().optional(),
  episode_source_concept_id: z.number().int().optional(),
})

export type DerivedEpisodeUpdate = {
  person_id?: number | undefined
  episode_concept_id?: number | undefined
  episode_start_date?: string | undefined
  episode_start_datetime?: string | undefined
  episode_end_date?: string | undefined
  episode_end_datetime?: string | undefined
  episode_parent_id?: number | undefined
  episode_number?: number | undefined
  episode_object_concept_id?: number | undefined
  episode_type_concept_id?: number | undefined
  episode_source_value?: string | undefined
  episode_source_concept_id?: number | undefined
}
