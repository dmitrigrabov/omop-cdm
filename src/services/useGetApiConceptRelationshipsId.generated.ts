import { vocabularyConceptRelationship } from '@/types/vocabularyConceptRelationship.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptRelationshipsIdArgs = { id: string }

export const useGetApiConceptRelationshipsId = ({
  id,
}: UseGetApiConceptRelationshipsIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - ConceptRelationships', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-relationships/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptRelationship.parse(data)
    },
  })

  return result
}
