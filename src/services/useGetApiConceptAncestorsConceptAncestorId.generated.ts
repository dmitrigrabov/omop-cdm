import { vocabularyConceptAncestor } from '@/types/vocabularyConceptAncestor.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptAncestorsConceptAncestorIdArgs = {
  concept_ancestor_id: number
}

export const useGetApiConceptAncestorsConceptAncestorId = ({
  concept_ancestor_id,
}: UseGetApiConceptAncestorsConceptAncestorIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - ConceptAncestors', concept_ancestor_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-ancestors/${concept_ancestor_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptAncestor.parse(data)
    },
  })

  return result
}
