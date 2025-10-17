import { resultsFactRelationship } from '@/types/resultsFactRelationship.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiFactRelationshipsResponse = z.object({
  data: z.array(resultsFactRelationship),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiFactRelationshipsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  relationship_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiFactRelationships = ({
  offset,
  limit,
  relationship_concept_id,
  sort_by,
  sort_order,
}: UseGetApiFactRelationshipsArgs) => {
  const result = useQuery({
    queryKey: [
      'Results - FactRelationships',
      offset,
      limit,
      relationship_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return useGetApiFactRelationshipsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
