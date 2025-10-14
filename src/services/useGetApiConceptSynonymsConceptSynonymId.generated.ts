import { vocabularyConceptSynonym } from '@/types/vocabularyConceptSynonym.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptSynonymsConceptSynonymIdArgs = {
  concept_synonym_id: number
}

export const useGetApiConceptSynonymsConceptSynonymId = ({
  concept_synonym_id,
}: UseGetApiConceptSynonymsConceptSynonymIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - ConceptSynonyms', concept_synonym_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms/${concept_synonym_id}`,
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
