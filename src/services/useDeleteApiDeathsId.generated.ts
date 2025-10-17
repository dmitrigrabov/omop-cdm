import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDeathsIdArgs = { id: string }

export const useDeleteApiDeathsIdResponse = z.void()

export type UseDeleteApiDeathsIdResponse = void

export type DeleteApiDeathsIdBody = void

export const useDeleteApiDeathsId = (
  args: UseMutationOptions<
    UseDeleteApiDeathsIdResponse,
    Error,
    UseDeleteApiDeathsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiDeathsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(`/deaths/${id}`, {
        method: 'DELETE',
      })

      if (error) {
        throw error
      }

      return useDeleteApiDeathsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Clinical - Deaths'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
