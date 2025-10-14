import { vocabularyConceptRelationship } from '@/types/vocabularyConceptRelationship.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConceptRelationshipsConceptRelationshipIdArgs = {
  concept_relationship_id: number
}

export const useGetApiConceptRelationshipsConceptRelationshipId = ({
  concept_relationship_id,
}: UseGetApiConceptRelationshipsConceptRelationshipIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - ConceptRelationships', concept_relationship_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-relationships/${concept_relationship_id}`,
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
