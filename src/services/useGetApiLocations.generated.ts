import { healthsystemLocation } from '@/types/healthsystemLocation.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiLocationsResponse = z.object({
  data: z.array(healthsystemLocation),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

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

      return useGetApiLocationsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
