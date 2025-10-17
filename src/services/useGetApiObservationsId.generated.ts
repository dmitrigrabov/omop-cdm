import { clinicalObservation } from '@/types/clinicalObservation.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiObservationsIdArgs = { id: string }

export const useGetApiObservationsId = ({
  id,
}: UseGetApiObservationsIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Observations', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/observations/${id}`,
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
