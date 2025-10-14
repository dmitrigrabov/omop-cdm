import { healthsystemCost } from '@/types/healthsystemCost.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCostsCostIdArgs = { cost_id: number }

export const useGetApiCostsCostId = ({ cost_id }: UseGetApiCostsCostIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - Costs', cost_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/costs/${cost_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return healthsystemCost.parse(data)
    },
  })

  return result
}
