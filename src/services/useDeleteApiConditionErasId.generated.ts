import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConditionErasIdArgs = { id: string }

export const useDeleteApiConditionErasIdResponse = z.void()

export type UseDeleteApiConditionErasIdResponse = void

export type DeleteApiConditionErasIdBody = void

export const useDeleteApiConditionErasId = (
  args: UseMutationOptions<
    UseDeleteApiConditionErasIdResponse,
    Error,
    UseDeleteApiConditionErasIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiConditionErasIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConditionErasIdResponse.parse(data)
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
