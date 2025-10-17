import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiEpisodeEventsIdArgs = { id: string }

export const useDeleteApiEpisodeEventsIdResponse = z.void()

export type UseDeleteApiEpisodeEventsIdResponse = void

export type DeleteApiEpisodeEventsIdBody = void

export const useDeleteApiEpisodeEventsId = (
  args: UseMutationOptions<
    UseDeleteApiEpisodeEventsIdResponse,
    Error,
    UseDeleteApiEpisodeEventsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiEpisodeEventsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episode-events/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiEpisodeEventsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Derived - EpisodeEvents'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
