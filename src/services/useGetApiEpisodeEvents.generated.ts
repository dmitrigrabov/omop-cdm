import { derivedEpisodeEvent } from '@/types/derivedEpisodeEvent.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiEpisodeEventsResponse = z.object({
  data: z.array(derivedEpisodeEvent),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiEpisodeEventsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  episode_id?: number | undefined
  episode_event_field_concept_id?: CommonConceptId | undefined
  sort_by?: 'episode_event_id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiEpisodeEvents = ({
  offset,
  limit,
  episode_id,
  episode_event_field_concept_id,
  sort_by,
  sort_order,
}: UseGetApiEpisodeEventsArgs) => {
  const result = useQuery({
    queryKey: [
      'Derived - EpisodeEvents',
      offset,
      limit,
      episode_id,
      episode_event_field_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/episode-events`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiEpisodeEventsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
