import { vocabularyConceptAncestorList } from '@/types/vocabularyConceptAncestorList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiConceptAncestorsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  ancestor_concept_id?: CommonConceptId | undefined
  descendant_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiConceptAncestors = ({
  offset,
  limit,
  ancestor_concept_id,
  descendant_concept_id,
  sort_by,
  sort_order,
}: UseGetApiConceptAncestorsArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - ConceptAncestors',
      offset,
      limit,
      ancestor_concept_id,
      descendant_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-ancestors`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptAncestorList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
