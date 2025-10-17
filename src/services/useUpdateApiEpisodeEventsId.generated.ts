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

export type UseUpdateApiEpisodeEventsIdArgs = {
  id: string
  body: DerivedEpisodeEventCreate
}

export const useUpdateApiEpisodeEventsId = (
  args: UseMutationOptions<
    DerivedEpisodeEvent,
    Error,
    UseUpdateApiEpisodeEventsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiEpisodeEventsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episode-events/${id}`,
        {
          method: 'PUT',
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
