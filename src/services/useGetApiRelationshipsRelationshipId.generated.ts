import { vocabularyRelationship } from '@/types/vocabularyRelationship.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiRelationshipsRelationshipIdArgs = {
  relationship_id: string
}

export const useGetApiRelationshipsRelationshipId = ({
  relationship_id,
}: UseGetApiRelationshipsRelationshipIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - Relationships', relationship_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships/${relationship_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyRelationship.parse(data)
    },
  })

  return result
}
