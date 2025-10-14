import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDeathsDeathIdArgs = { death_id: number }

export const useDeleteApiDeathsDeathIdResponse = z.void()

export type UseDeleteApiDeathsDeathIdResponse = void

export type DeleteApiDeathsDeathIdBody = void

export const useDeleteApiDeathsDeathId = (
  args: UseMutationOptions<
    UseDeleteApiDeathsDeathIdResponse,
    Error,
    UseDeleteApiDeathsDeathIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ death_id }: UseDeleteApiDeathsDeathIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/deaths/${death_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDeathsDeathIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Deaths'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
