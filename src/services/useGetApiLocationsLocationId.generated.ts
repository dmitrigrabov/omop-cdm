import { healthsystemLocation } from '@/types/healthsystemLocation.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiLocationsLocationIdArgs = { location_id: number }

export const useGetApiLocationsLocationId = ({
  location_id,
}: UseGetApiLocationsLocationIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - Locations', location_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/locations/${location_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return healthsystemLocation.parse(data)
    },
  })

  return result
}
