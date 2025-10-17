import { vocabularyVocabularyList } from '@/types/vocabularyVocabularyList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiVocabularysArgs = {
  offset?: number | undefined
  limit?: number | undefined
  vocabulary_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiVocabularys = ({
  offset,
  limit,
  vocabulary_concept_id,
  sort_by,
  sort_order,
}: UseGetApiVocabularysArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - Vocabularys',
      offset,
      limit,
      vocabulary_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/vocabularys`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return vocabularyVocabularyList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
