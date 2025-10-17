import { vocabularyVocabulary } from '@/types/vocabularyVocabulary.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiVocabularysIdArgs = { id: string }

export const useGetApiVocabularysId = ({ id }: UseGetApiVocabularysIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - Vocabularys', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/vocabularys/${id}`,
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
