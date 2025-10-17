import { derivedConditionEra } from '@/types/derivedConditionEra.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConditionErasIdArgs = { id: number }

export const useGetApiConditionErasId = ({
  id,
}: UseGetApiConditionErasIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - ConditionEras', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-eras/${id}`,
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
