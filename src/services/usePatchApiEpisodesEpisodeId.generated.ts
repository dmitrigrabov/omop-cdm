import { DerivedEpisodeUpdate } from '@/types/derivedEpisodeUpdate.generated.ts'
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

export type UsePatchApiEpisodesEpisodeIdArgs = {
  episode_id: number
  body: DerivedEpisodeUpdate
}

export const usePatchApiEpisodesEpisodeId = (
  args: UseMutationOptions<
    DerivedEpisode,
    Error,
    UsePatchApiEpisodesEpisodeIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      episode_id,
      body,
    }: UsePatchApiEpisodesEpisodeIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episodes/${episode_id}`,
        {
          method: 'PATCH',
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
