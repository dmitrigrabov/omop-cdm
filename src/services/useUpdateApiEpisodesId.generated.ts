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

export type UseUpdateApiEpisodesIdArgs = {
  id: number
  body: DerivedEpisodeCreate
}

export const useUpdateApiEpisodesId = (
  args: UseMutationOptions<
    DerivedEpisode,
    Error,
    UseUpdateApiEpisodesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiEpisodesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episodes/${id}`,
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
