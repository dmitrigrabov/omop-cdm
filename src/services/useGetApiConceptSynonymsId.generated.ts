import { vocabularyConceptSynonym } from '@/types/vocabularyConceptSynonym.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptSynonymsIdArgs = { id: number }

export const useGetApiConceptSynonymsId = ({
  id,
}: UseGetApiConceptSynonymsIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - ConceptSynonyms', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptSynonym.parse(data)
    },
  })

  return result
}
