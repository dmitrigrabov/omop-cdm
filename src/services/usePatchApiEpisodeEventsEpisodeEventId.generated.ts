import { DerivedEpisodeEventUpdate } from '@/types/derivedEpisodeEventUpdate.generated.ts'
import {
  derivedEpisodeEvent,
  DerivedEpisodeEvent,
} from '@/types/derivedEpisodeEvent.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiEpisodeEventsEpisodeEventIdArgs = {
  episode_event_id: number
  body: DerivedEpisodeEventUpdate
}

export const usePatchApiEpisodeEventsEpisodeEventId = (
  args: UseMutationOptions<
    DerivedEpisodeEvent,
    Error,
    UsePatchApiEpisodeEventsEpisodeEventIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      episode_event_id,
      body,
    }: UsePatchApiEpisodeEventsEpisodeEventIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episode-events/${episode_event_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return derivedEpisodeEvent.parse(data)
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
