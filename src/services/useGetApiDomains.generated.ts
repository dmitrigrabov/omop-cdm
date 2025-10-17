import { vocabularyDomainList } from '@/types/vocabularyDomainList.generated.ts'
import { CommonConceptId } from '@/types/commonConceptId.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

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

      return vocabularyDomainList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
