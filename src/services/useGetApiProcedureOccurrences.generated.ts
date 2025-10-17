import { clinicalProcedureOccurrenceList } from '@/types/clinicalProcedureOccurrenceList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiProcedureOccurrencesArgs = {
  offset?: number | undefined
  limit?: number | undefined
  person_id?: number | undefined
  procedure_concept_id?: CommonConceptId | undefined
  procedure_type_concept_id?: CommonConceptId | undefined
  modifier_concept_id?: CommonConceptId | undefined
  provider_id?: number | undefined
  visit_occurrence_id?: number | undefined
  visit_detail_id?: number | undefined
  procedure_source_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiProcedureOccurrences = ({
  offset,
  limit,
  person_id,
  procedure_concept_id,
  procedure_type_concept_id,
  modifier_concept_id,
  provider_id,
  visit_occurrence_id,
  visit_detail_id,
  procedure_source_concept_id,
  sort_by,
  sort_order,
}: UseGetApiProcedureOccurrencesArgs) => {
  const result = useQuery({
    queryKey: [
      'Clinical - ProcedureOccurrences',
      offset,
      limit,
      person_id,
      procedure_concept_id,
      procedure_type_concept_id,
      modifier_concept_id,
      provider_id,
      visit_occurrence_id,
      visit_detail_id,
      procedure_source_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/procedure-occurrences`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalProcedureOccurrenceList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
