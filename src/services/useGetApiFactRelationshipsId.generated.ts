import { resultsFactRelationship } from '@/types/resultsFactRelationship.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiFactRelationshipsIdArgs = { id: number }

export const useGetApiFactRelationshipsId = ({
  id,
}: UseGetApiFactRelationshipsIdArgs) => {
  const result = useQuery({
    queryKey: ['Results - FactRelationships', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships/${id}`,
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
