import { healthsystemPayerPlanPeriod } from '@/types/healthsystemPayerPlanPeriod.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiPayerPlanPeriodsIdArgs = { id: number }

export const useGetApiPayerPlanPeriodsId = ({
  id,
}: UseGetApiPayerPlanPeriodsIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - PayerPlanPeriods', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/payer-plan-periods/${id}`,
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
