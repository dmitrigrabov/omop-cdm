import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCohortsIdArgs = { id: number }

export const useDeleteApiCohortsIdResponse = z.void()

export type UseDeleteApiCohortsIdResponse = void

export type DeleteApiCohortsIdBody = void

export const useDeleteApiCohortsId = (
  args: UseMutationOptions<
    UseDeleteApiCohortsIdResponse,
    Error,
    UseDeleteApiCohortsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiCohortsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohorts/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiCohortsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Results - Cohorts'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
