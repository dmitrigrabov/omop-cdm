import { vocabularyConceptList } from '@/types/vocabularyConceptList.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiConceptsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  domain_id?: string | undefined
  vocabulary_id?: string | undefined
  concept_class_id?: string | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiConcepts = ({
  offset,
  limit,
  domain_id,
  vocabulary_id,
  concept_class_id,
  sort_by,
  sort_order,
}: UseGetApiConceptsArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - Concepts',
      offset,
      limit,
      domain_id,
      vocabulary_id,
      concept_class_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/concepts`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return vocabularyConceptList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
