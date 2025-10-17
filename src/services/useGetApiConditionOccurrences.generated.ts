import { clinicalConditionOccurrenceList } from '@/types/clinicalConditionOccurrenceList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiConditionOccurrencesArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  condition_concept_id?: CommonConceptId | undefined
  condition_type_concept_id?: CommonConceptId | undefined
  condition_status_concept_id?: CommonConceptId | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  condition_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiConditionOccurrences = ({
  offset,
  limit,
  person_id,
  condition_concept_id,
  condition_type_concept_id,
  condition_status_concept_id,
  provider_id,
  visit_occurrence_id,
  visit_detail_id,
  condition_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiConditionOccurrencesArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - ConditionOccurrences',
      offset,
      limit,
      person_id,
      condition_concept_id,
      condition_type_concept_id,
      condition_status_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      condition_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-occurrences`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalConditionOccurrenceList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
