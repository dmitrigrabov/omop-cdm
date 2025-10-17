import { healthsystemCareSite } from '@/types/healthsystemCareSite.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCareSitesIdArgs = { id: string }

export const useGetApiCareSitesId = ({ id }: UseGetApiCareSitesIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - CareSites', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/care-sites/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return healthsystemCareSite.parse(data)
    },
  })

  return result
}
