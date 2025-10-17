import { derivedEpisode } from '@/types/derivedEpisode.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiEpisodesResponse = z.object({
  data: z.array(derivedEpisode),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiEpisodesArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  episode_concept_id?: CommonConceptId | undefined
  episode_object_concept_id?: CommonConceptId | undefined
  episode_type_concept_id?: CommonConceptId | undefined
  episode_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiEpisodes = ({
  offset,
  limit,
  person_id,
  episode_concept_id,
  episode_object_concept_id,
  episode_type_concept_id,
  episode_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiEpisodesArgs) => {
  const result = useQuery({
    queryKey: [
      'Derived - Episodes',
      offset,
      limit,
      person_id,
      episode_concept_id,
      episode_object_concept_id,
      episode_type_concept_id,
      episode_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/episodes`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return useGetApiEpisodesResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
