import { vocabularyDomain } from '@/types/vocabularyDomain.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDomainsDomainIdArgs = { domain_id: string }

export const useGetApiDomainsDomainId = ({
  domain_id,
}: UseGetApiDomainsDomainIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - Domains', domain_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/domains/${domain_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return vocabularyDomain.parse(data)
    },
  })

  return result
}
