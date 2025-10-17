import { vocabularyDomain } from '@/types/vocabularyDomain.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDomainsIdArgs = { id: string }

export const useGetApiDomainsId = ({ id }: UseGetApiDomainsIdArgs) => {
  const result = useQuery({
    queryKey: ['Vocabulary - Domains', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/domains/${id}`,
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
