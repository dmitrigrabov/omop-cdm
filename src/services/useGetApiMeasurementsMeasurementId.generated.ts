import { clinicalMeasurement } from '@/types/clinicalMeasurement.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiMeasurementsMeasurementIdArgs = { measurement_id: number }

export const useGetApiMeasurementsMeasurementId = ({
  measurement_id,
}: UseGetApiMeasurementsMeasurementIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Measurements', measurement_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/measurements/${measurement_id}`,
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
