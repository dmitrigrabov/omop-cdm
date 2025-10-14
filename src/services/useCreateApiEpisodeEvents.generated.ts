import { DerivedEpisodeEventCreate } from '@/types/derivedEpisodeEventCreate.generated.ts'
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

export type UseCreateApiEpisodeEventsArgs = { body: DerivedEpisodeEventCreate }

export const useCreateApiEpisodeEvents = (
  args: UseMutationOptions<
    DerivedEpisodeEvent,
    Error,
    UseCreateApiEpisodeEventsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiEpisodeEventsArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episode-events`,
        {
          method: 'POST',
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
