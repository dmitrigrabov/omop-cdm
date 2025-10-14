import { DerivedEpisodeCreate } from '@/types/derivedEpisodeCreate.generated.ts'
import {
  derivedEpisode,
  DerivedEpisode,
} from '@/types/derivedEpisode.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiEpisodesEpisodeIdArgs = {
  episode_id: number
  body: DerivedEpisodeCreate
}

export const useUpdateApiEpisodesEpisodeId = (
  args: UseMutationOptions<
    DerivedEpisode,
    Error,
    UseUpdateApiEpisodesEpisodeIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      episode_id,
      body,
    }: UseUpdateApiEpisodesEpisodeIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episodes/${episode_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return derivedEpisode.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - Episodes'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
