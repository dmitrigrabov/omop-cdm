import { clinicalObservation } from '@/types/clinicalObservation.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiObservationsObservationIdArgs = { observation_id: number }

export const useGetApiObservationsObservationId = ({
  observation_id,
}: UseGetApiObservationsObservationIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Observations', observation_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/observations/${observation_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalObservation.parse(data)
    },
  })

  return result
}
