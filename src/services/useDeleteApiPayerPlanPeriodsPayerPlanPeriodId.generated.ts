import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiPayerPlanPeriodsPayerPlanPeriodIdArgs = {
  payer_plan_period_id: number
}

export const useDeleteApiPayerPlanPeriodsPayerPlanPeriodIdResponse = z.void()

export type UseDeleteApiPayerPlanPeriodsPayerPlanPeriodIdResponse = void

export type DeleteApiPayerPlanPeriodsPayerPlanPeriodIdBody = void

export const useDeleteApiPayerPlanPeriodsPayerPlanPeriodId = (
  args: UseMutationOptions<
    UseDeleteApiPayerPlanPeriodsPayerPlanPeriodIdResponse,
    Error,
    UseDeleteApiPayerPlanPeriodsPayerPlanPeriodIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      payer_plan_period_id,
    }: UseDeleteApiPayerPlanPeriodsPayerPlanPeriodIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/payer-plan-periods/${payer_plan_period_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiPayerPlanPeriodsPayerPlanPeriodIdResponse.parse(data)
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
