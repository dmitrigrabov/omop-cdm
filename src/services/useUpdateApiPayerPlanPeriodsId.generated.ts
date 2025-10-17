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

export type UseUpdateApiPayerPlanPeriodsIdArgs = {
  id: string
  body: HealthsystemPayerPlanPeriodCreate
}

export const useUpdateApiPayerPlanPeriodsId = (
  args: UseMutationOptions<
    HealthsystemPayerPlanPeriod,
    Error,
    UseUpdateApiPayerPlanPeriodsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiPayerPlanPeriodsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/payer-plan-periods/${id}`,
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
