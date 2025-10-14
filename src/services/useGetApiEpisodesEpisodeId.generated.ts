import { derivedEpisode } from '@/types/derivedEpisode.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiEpisodesEpisodeIdArgs = { episode_id: number }

export const useGetApiEpisodesEpisodeId = ({
  episode_id,
}: UseGetApiEpisodesEpisodeIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - Episodes', episode_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/episodes/${episode_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return derivedEpisode.parse(data)
    },
  })

  return result
}
