import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiEpisodesIdArgs = { id: number }

export const useDeleteApiEpisodesIdResponse = z.void()

export type UseDeleteApiEpisodesIdResponse = void

export type DeleteApiEpisodesIdBody = void

export const useDeleteApiEpisodesId = (
  args: UseMutationOptions<
    UseDeleteApiEpisodesIdResponse,
    Error,
    UseDeleteApiEpisodesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiEpisodesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/episodes/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiEpisodesIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Derived - Episodes'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
