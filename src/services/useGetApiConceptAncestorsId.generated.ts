import { vocabularyConceptAncestor } from '@/types/vocabularyConceptAncestor.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptAncestorsIdArgs = { id: number }

export const useGetApiConceptAncestorsId = ({
  id,
}: UseGetApiConceptAncestorsIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - ConceptAncestors', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-ancestors/${id}`,
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
