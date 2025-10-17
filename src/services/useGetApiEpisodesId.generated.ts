import { derivedEpisode } from '@/types/derivedEpisode.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiEpisodesIdArgs = { id: number }

export const useGetApiEpisodesId = ({ id }: UseGetApiEpisodesIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - Episodes', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/episodes/${id}`,
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
