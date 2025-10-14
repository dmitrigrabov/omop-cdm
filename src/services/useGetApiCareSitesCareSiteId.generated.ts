import { healthsystemCareSite } from '@/types/healthsystemCareSite.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCareSitesCareSiteIdArgs = { care_site_id: number }

export const useGetApiCareSitesCareSiteId = ({
  care_site_id,
}: UseGetApiCareSitesCareSiteIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - CareSites', care_site_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/care-sites/${care_site_id}`,
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
