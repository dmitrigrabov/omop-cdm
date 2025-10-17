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

export type UseCreateApiPayerPlanPeriodsArgs = {
  body: HealthsystemPayerPlanPeriodCreate
}

export const useCreateApiPayerPlanPeriods = (
  args: UseMutationOptions<
    HealthsystemPayerPlanPeriod,
    Error,
    UseCreateApiPayerPlanPeriodsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiPayerPlanPeriodsArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/payer-plan-periods`,
        {
          method: 'POST',
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
