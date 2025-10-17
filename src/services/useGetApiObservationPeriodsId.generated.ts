import { clinicalObservationPeriod } from '@/types/clinicalObservationPeriod.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiObservationPeriodsIdArgs = { id: number }

export const useGetApiObservationPeriodsId = ({
  id,
}: UseGetApiObservationPeriodsIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - ObservationPeriods', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalObservationPeriod.parse(data)
    },
  })

  return result
}
