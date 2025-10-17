import { clinicalDeviceExposure } from '@/types/clinicalDeviceExposure.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiDeviceExposuresResponse = z.object({
  data: z.array(clinicalDeviceExposure),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiDeviceExposuresArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  device_concept_id?: CommonConceptId | undefined
  device_type_concept_id?: CommonConceptId | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  device_source_concept_id?: CommonConceptId | undefined
  unit_concept_id?: CommonConceptId | undefined
  unit_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiDeviceExposures = ({
  offset,
  limit,
  person_id,
  device_concept_id,
  device_type_concept_id,
  provider_id,
  visit_occurrence_id,
  visit_detail_id,
  device_source_concept_id,
  unit_concept_id,
  unit_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiDeviceExposuresArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - DeviceExposures',
      offset,
      limit,
      person_id,
      device_concept_id,
      device_type_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      device_source_concept_id,
      unit_concept_id,
      unit_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/device-exposures`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiDeviceExposuresResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
