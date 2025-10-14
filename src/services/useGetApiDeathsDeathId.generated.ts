import { clinicalDeath } from '@/types/clinicalDeath.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDeathsDeathIdArgs = { death_id: number }

export const useGetApiDeathsDeathId = ({
  death_id,
}: UseGetApiDeathsDeathIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Deaths', death_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/deaths/${death_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalDeath.parse(data)
    },
  })

  return result
}
