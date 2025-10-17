import { HealthsystemPayerPlanPeriodUpdate } from '@/types/healthsystemPayerPlanPeriodUpdate.generated.ts'
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

export type UsePatchApiPayerPlanPeriodsIdArgs = {
  id: string
  body: HealthsystemPayerPlanPeriodUpdate
}

export const usePatchApiPayerPlanPeriodsId = (
  args: UseMutationOptions<
    HealthsystemPayerPlanPeriod,
    Error,
    UsePatchApiPayerPlanPeriodsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiPayerPlanPeriodsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/payer-plan-periods/${id}`,
        {
          method: 'PATCH',
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
