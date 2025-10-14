import { clinicalObservationPeriod } from '@/types/clinicalObservationPeriod.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiObservationPeriodsObservationPeriodIdArgs = {
  observation_period_id: number
}

export const useGetApiObservationPeriodsObservationPeriodId = ({
  observation_period_id,
}: UseGetApiObservationPeriodsObservationPeriodIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - ObservationPeriods', observation_period_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods/${observation_period_id}`,
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
