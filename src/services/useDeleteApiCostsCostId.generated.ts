import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCostsCostIdArgs = { cost_id: number }

export const useDeleteApiCostsCostIdResponse = z.void()

export type UseDeleteApiCostsCostIdResponse = void

export type DeleteApiCostsCostIdBody = void

export const useDeleteApiCostsCostId = (
  args: UseMutationOptions<
    UseDeleteApiCostsCostIdResponse,
    Error,
    UseDeleteApiCostsCostIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ cost_id }: UseDeleteApiCostsCostIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/costs/${cost_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiCostsCostIdResponse.parse(data)
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
