import { derivedConditionEra } from '@/types/derivedConditionEra.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConditionErasConditionEraIdArgs = {
  condition_era_id: number
}

export const useGetApiConditionErasConditionEraId = ({
  condition_era_id,
}: UseGetApiConditionErasConditionEraIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - ConditionEras', condition_era_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras/${condition_era_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return derivedConditionEra.parse(data)
    },
  })

  return result
}
