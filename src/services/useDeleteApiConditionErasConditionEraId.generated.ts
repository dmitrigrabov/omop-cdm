import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConditionErasConditionEraIdArgs = {
  condition_era_id: number
}

export const useDeleteApiConditionErasConditionEraIdResponse = z.void()

export type UseDeleteApiConditionErasConditionEraIdResponse = void

export type DeleteApiConditionErasConditionEraIdBody = void

export const useDeleteApiConditionErasConditionEraId = (
  args: UseMutationOptions<
    UseDeleteApiConditionErasConditionEraIdResponse,
    Error,
    UseDeleteApiConditionErasConditionEraIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      condition_era_id,
    }: UseDeleteApiConditionErasConditionEraIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras/${condition_era_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConditionErasConditionEraIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Derived - ConditionEras'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
