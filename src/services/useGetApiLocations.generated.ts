import { healthsystemLocationList } from '@/types/healthsystemLocationList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiLocationsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  country_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiLocations = ({
  offset,
  limit,
  country_concept_id,
  sort_by,
  sort_order,
}: UseGetApiLocationsArgs) => {
  const result = useQuery({
    queryKey: [
      'Health System - Locations',
      offset,
      limit,
      country_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/locations`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return healthsystemLocationList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
