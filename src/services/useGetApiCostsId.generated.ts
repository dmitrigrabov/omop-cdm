import { healthsystemCost } from '@/types/healthsystemCost.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCostsIdArgs = { id: number }

export const useGetApiCostsId = ({ id }: UseGetApiCostsIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - Costs', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/costs/${id}`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return healthsystemCost.parse(data)
    },
  })

  return result
}
