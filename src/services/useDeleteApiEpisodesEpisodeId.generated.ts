import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiEpisodesEpisodeIdArgs = { episode_id: number }

export const useDeleteApiEpisodesEpisodeIdResponse = z.void()

export type UseDeleteApiEpisodesEpisodeIdResponse = void

export type DeleteApiEpisodesEpisodeIdBody = void

export const useDeleteApiEpisodesEpisodeId = (
  args: UseMutationOptions<
    UseDeleteApiEpisodesEpisodeIdResponse,
    Error,
    UseDeleteApiEpisodesEpisodeIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ episode_id }: UseDeleteApiEpisodesEpisodeIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episodes/${episode_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiEpisodesEpisodeIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - Episodes'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
