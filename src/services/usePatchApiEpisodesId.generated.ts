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

export type UsePatchApiEpisodesIdArgs = {
  id: string
  body: DerivedEpisodeUpdate
}

export const usePatchApiEpisodesId = (
  args: UseMutationOptions<
    DerivedEpisode,
    Error,
    UsePatchApiEpisodesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiEpisodesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episodes/${id}`,
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
