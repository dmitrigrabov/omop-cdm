import { vocabularyConceptClassList } from '@/types/vocabularyConceptClassList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiConceptClasssArgs = {
  offset?: number | undefined
  limit?: number | undefined
  concept_class_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiConceptClasss = ({
  offset,
  limit,
  concept_class_concept_id,
  sort_by,
  sort_order,
}: UseGetApiConceptClasssArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - ConceptClasss',
      offset,
      limit,
      concept_class_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptClassList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
