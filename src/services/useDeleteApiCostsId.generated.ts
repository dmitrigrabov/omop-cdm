import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCostsIdArgs = { id: string }

export const useDeleteApiCostsIdResponse = z.void()

export type UseDeleteApiCostsIdResponse = void

export type DeleteApiCostsIdBody = void

export const useDeleteApiCostsId = (
  args: UseMutationOptions<
    UseDeleteApiCostsIdResponse,
    Error,
    UseDeleteApiCostsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiCostsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(`/costs/${id}`, {
        method: 'DELETE',
      })

      if (error) {
        throw error
      }

      return useDeleteApiCostsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - Costs'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
