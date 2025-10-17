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

export type UseCreateApiEpisodesArgs = { body: DerivedEpisodeCreate }

export const useCreateApiEpisodes = (
  args: UseMutationOptions<
    DerivedEpisode,
    Error,
    UseCreateApiEpisodesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiEpisodesArgs) => {
      const { data, error } = await supabase.functions.invoke(`/episodes`, {
        method: 'POST',
        body,
      })

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
