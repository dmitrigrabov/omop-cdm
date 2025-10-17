import { resultsFactRelationshipList } from '@/types/resultsFactRelationshipList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiFactRelationshipsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  relationship_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiFactRelationships = ({
  offset,
  limit,
  relationship_concept_id,
  sort_by,
  sort_order,
}: UseGetApiFactRelationshipsArgs) => {
  const result = useQuery({
    queryKey: [
      'Results - FactRelationships',
      offset,
      limit,
      relationship_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return resultsFactRelationshipList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
