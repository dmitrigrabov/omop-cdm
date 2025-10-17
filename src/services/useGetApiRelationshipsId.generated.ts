import { vocabularyRelationship } from '@/types/vocabularyRelationship.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiRelationshipsIdArgs = { id: string }

export const useGetApiRelationshipsId = ({
  id,
}: UseGetApiRelationshipsIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - Relationships', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships/${id}`,
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
