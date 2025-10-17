import { derivedEpisodeEventList } from '@/types/derivedEpisodeEventList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiEpisodeEventsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  episode_id?: number | undefined
  episode_event_field_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
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

      return derivedEpisodeEventList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
