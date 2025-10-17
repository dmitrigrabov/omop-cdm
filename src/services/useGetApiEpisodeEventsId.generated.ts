import { derivedEpisodeEvent } from '@/types/derivedEpisodeEvent.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiEpisodeEventsIdArgs = { id: string }

export const useGetApiEpisodeEventsId = ({
  id,
}: UseGetApiEpisodeEventsIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - EpisodeEvents', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/episode-events/${id}`,
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
