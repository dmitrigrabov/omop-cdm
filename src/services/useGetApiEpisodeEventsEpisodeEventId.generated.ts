import { derivedEpisodeEvent } from '@/types/derivedEpisodeEvent.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiEpisodeEventsEpisodeEventIdArgs = {
  episode_event_id: number
}

export const useGetApiEpisodeEventsEpisodeEventId = ({
  episode_event_id,
}: UseGetApiEpisodeEventsEpisodeEventIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - EpisodeEvents', episode_event_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/episode-events/${episode_event_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return derivedEpisodeEvent.parse(data)
    },
  })

  return result
}
