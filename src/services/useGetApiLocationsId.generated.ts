import { healthsystemLocation } from '@/types/healthsystemLocation.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiLocationsIdArgs = { id: string }

export const useGetApiLocationsId = ({ id }: UseGetApiLocationsIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - Locations', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/locations/${id}`,
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
