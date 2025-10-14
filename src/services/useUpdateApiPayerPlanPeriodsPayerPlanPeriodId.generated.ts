import { HealthsystemPayerPlanPeriodCreate } from '@/types/healthsystemPayerPlanPeriodCreate.generated.ts'
import {
  healthsystemPayerPlanPeriod,
  HealthsystemPayerPlanPeriod,
} from '@/types/healthsystemPayerPlanPeriod.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiPayerPlanPeriodsPayerPlanPeriodIdArgs = {
  payer_plan_period_id: number
  body: HealthsystemPayerPlanPeriodCreate
}

export const useUpdateApiPayerPlanPeriodsPayerPlanPeriodId = (
  args: UseMutationOptions<
    HealthsystemPayerPlanPeriod,
    Error,
    UseUpdateApiPayerPlanPeriodsPayerPlanPeriodIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      payer_plan_period_id,
      body,
    }: UseUpdateApiPayerPlanPeriodsPayerPlanPeriodIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/payer-plan-periods/${payer_plan_period_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return healthsystemPayerPlanPeriod.parse(data)
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
