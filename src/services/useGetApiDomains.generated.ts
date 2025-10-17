import { vocabularyDomain } from '@/types/vocabularyDomain.generated.ts'
import { z } from 'zod'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export const useGetApiDomainsResponse = z.object({
  data: z.array(vocabularyDomain),
  pagination: z.object({
    total: z.number().int(),
    offset: z.number().int(),
    limit: z.number().int(),
    count: z.number().int(),
  }),
})

export type UseGetApiDomainsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  domain_concept_id?: CommonConceptId | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiDomains = ({
  offset,
  limit,
  domain_concept_id,
  sort_by,
  sort_order,
}: UseGetApiDomainsArgs) => {
  const result = useQuery({
    queryKey: [
      'Vocabulary - Domains',
      offset,
      limit,
      domain_concept_id,
      sort_by,
      sort_order,
    ],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/domains`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return useGetApiDomainsResponse.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
