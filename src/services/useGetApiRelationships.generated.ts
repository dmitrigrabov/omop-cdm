import { vocabularyRelationshipList } from '@/types/vocabularyRelationshipList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiRelationshipsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  relationship_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiRelationships = ({
  offset,
  limit,
  relationship_concept_id,
  sort_by,
  sort_order,
}: UseGetApiRelationshipsArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - Relationships',
      offset,
      limit,
      relationship_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyRelationshipList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
