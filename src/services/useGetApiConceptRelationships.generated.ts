import { vocabularyConceptRelationship } from '@/types/vocabularyConceptRelationship.generated.ts'
import { z } from 'zod'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiConceptRelationshipsResponse = z.object({
  data: z.array(vocabularyConceptRelationship),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiConceptRelationshipsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  relationship_id?: string | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiConceptRelationships = ({
  offset,
  limit,
  relationship_id,
  sort_by,
  sort_order,
}: UseGetApiConceptRelationshipsArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - ConceptRelationships',
      offset,
      limit,
      relationship_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-relationships`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiConceptRelationshipsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
