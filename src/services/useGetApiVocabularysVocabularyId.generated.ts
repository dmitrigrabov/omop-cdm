import { vocabularyVocabulary } from '@/types/vocabularyVocabulary.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiVocabularysVocabularyIdArgs = { vocabulary_id: string }

export const useGetApiVocabularysVocabularyId = ({
  vocabulary_id,
}: UseGetApiVocabularysVocabularyIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - Vocabularys', vocabulary_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/vocabularys/${vocabulary_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyVocabulary.parse(data)
    },
  })

  return result
}
