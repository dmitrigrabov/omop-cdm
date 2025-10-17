import { clinicalObservationList } from '@/types/clinicalObservationList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiObservationsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  observation_concept_id?: CommonConceptId | undefined
  observation_type_concept_id?: CommonConceptId | undefined
  value_as_concept_id?: CommonConceptId | undefined
  qualifier_concept_id?: CommonConceptId | undefined
  unit_concept_id?: CommonConceptId | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  observation_source_concept_id?: CommonConceptId | undefined
  obs_event_field_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiObservations = ({
  offset,
  limit,
  person_id,
  observation_concept_id,
  observation_type_concept_id,
  value_as_concept_id,
  qualifier_concept_id,
  unit_concept_id,
  provider_id,
  visit_occurrence_id,
  visit_detail_id,
  observation_source_concept_id,
  obs_event_field_concept_id,
  sort_by,
  sort_order,
}: UseGetApiObservationsArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - Observations',
      offset,
      limit,
      person_id,
      observation_concept_id,
      observation_type_concept_id,
      value_as_concept_id,
      qualifier_concept_id,
      unit_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      observation_source_concept_id,
      obs_event_field_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/observations`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return clinicalObservationList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
