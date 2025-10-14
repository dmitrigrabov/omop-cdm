import { resultsFactRelationship } from '@/types/resultsFactRelationship.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiFactRelationshipsFactRelationshipIdArgs = {
  fact_relationship_id: number
}

export const useGetApiFactRelationshipsFactRelationshipId = ({
  fact_relationship_id,
}: UseGetApiFactRelationshipsFactRelationshipIdArgs) => {
  const result = useQuery({
    queryKey: ['Results - FactRelationships', fact_relationship_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships/${fact_relationship_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return resultsFactRelationship.parse(data)
    },
  })

  return result
}
