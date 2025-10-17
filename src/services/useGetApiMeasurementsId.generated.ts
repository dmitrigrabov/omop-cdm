import { clinicalMeasurement } from '@/types/clinicalMeasurement.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiMeasurementsIdArgs = { id: string }

export const useGetApiMeasurementsId = ({
  id,
}: UseGetApiMeasurementsIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Measurements', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/measurements/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalMeasurement.parse(data)
    },
  })

  return result
}
