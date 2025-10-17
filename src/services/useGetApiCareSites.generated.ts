import { healthsystemCareSiteList } from '@/types/healthsystemCareSiteList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiCareSitesArgs = {
  offset?: number | undefined
  limit?: number | undefined
  place_of_service_concept_id?: CommonConceptId | undefined
  location_id?: number | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiCareSites = ({
  offset,
  limit,
  place_of_service_concept_id,
  location_id,
  sort_by,
  sort_order,
}: UseGetApiCareSitesArgs) => {
  const result = useQuery({
    queryKey: [
      'Health System - CareSites',
      offset,
      limit,
      place_of_service_concept_id,
      location_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/care-sites`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return healthsystemCareSiteList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
