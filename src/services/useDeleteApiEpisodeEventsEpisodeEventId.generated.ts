import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiEpisodeEventsEpisodeEventIdArgs = {
  episode_event_id: number
}

export const useDeleteApiEpisodeEventsEpisodeEventIdResponse = z.void()

export type UseDeleteApiEpisodeEventsEpisodeEventIdResponse = void

export type DeleteApiEpisodeEventsEpisodeEventIdBody = void

export const useDeleteApiEpisodeEventsEpisodeEventId = (
  args: UseMutationOptions<
    UseDeleteApiEpisodeEventsEpisodeEventIdResponse,
    Error,
    UseDeleteApiEpisodeEventsEpisodeEventIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      episode_event_id,
    }: UseDeleteApiEpisodeEventsEpisodeEventIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episode-events/${episode_event_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiEpisodeEventsEpisodeEventIdResponse.parse(data)
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
