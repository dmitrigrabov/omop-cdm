import { clinicalMeasurement } from '@/types/clinicalMeasurement.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiMeasurementsResponse = z.object({
  data: z.array(clinicalMeasurement),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiMeasurementsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  measurement_concept_id?: CommonConceptId | undefined
  measurement_type_concept_id?: CommonConceptId | undefined
  operator_concept_id?: CommonConceptId | undefined
  value_as_concept_id?: CommonConceptId | undefined
  unit_concept_id?: CommonConceptId | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  measurement_source_concept_id?: CommonConceptId | undefined
  unit_source_concept_id?: CommonConceptId | undefined
  meas_event_field_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiMeasurements = ({
  offset,
  limit,
  person_id,
  measurement_concept_id,
  measurement_type_concept_id,
  operator_concept_id,
  value_as_concept_id,
  unit_concept_id,
  provider_id,
  visit_occurrence_id,
  visit_detail_id,
  measurement_source_concept_id,
  unit_source_concept_id,
  meas_event_field_concept_id,
  sort_by,
  sort_order,
}: UseGetApiMeasurementsArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - Measurements',
      offset,
      limit,
      person_id,
      measurement_concept_id,
      measurement_type_concept_id,
      operator_concept_id,
      value_as_concept_id,
      unit_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      measurement_source_concept_id,
      unit_source_concept_id,
      meas_event_field_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/measurements`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return useGetApiMeasurementsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
