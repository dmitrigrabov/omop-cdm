import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiPayerPlanPeriodsIdArgs = { id: string }

export const useDeleteApiPayerPlanPeriodsIdResponse = z.void()

export type UseDeleteApiPayerPlanPeriodsIdResponse = void

export type DeleteApiPayerPlanPeriodsIdBody = void

export const useDeleteApiPayerPlanPeriodsId = (
  args: UseMutationOptions<
    UseDeleteApiPayerPlanPeriodsIdResponse,
    Error,
    UseDeleteApiPayerPlanPeriodsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiPayerPlanPeriodsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/payer-plan-periods/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiPayerPlanPeriodsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - PayerPlanPeriods'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
