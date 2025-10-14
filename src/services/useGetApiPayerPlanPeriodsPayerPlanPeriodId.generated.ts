import { healthsystemPayerPlanPeriod } from '@/types/healthsystemPayerPlanPeriod.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiPayerPlanPeriodsPayerPlanPeriodIdArgs = {
  payer_plan_period_id: number
}

export const useGetApiPayerPlanPeriodsPayerPlanPeriodId = ({
  payer_plan_period_id,
}: UseGetApiPayerPlanPeriodsPayerPlanPeriodIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - PayerPlanPeriods', payer_plan_period_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/payer-plan-periods/${payer_plan_period_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return healthsystemPayerPlanPeriod.parse(data)
    },
  })

  return result
}
