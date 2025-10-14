import { VocabularyDomainCreate } from '@/types/vocabularyDomainCreate.generated.ts'
import {
  vocabularyDomain,
  VocabularyDomain,
} from '@/types/vocabularyDomain.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiDomainsDomainIdArgs = {
  domain_id: string
  body: VocabularyDomainCreate
}

export const useUpdateApiDomainsDomainId = (
  args: UseMutationOptions<
    VocabularyDomain,
    Error,
    UseUpdateApiDomainsDomainIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      domain_id,
      body,
    }: UseUpdateApiDomainsDomainIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/domains/${domain_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyDomain.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Vocabulary - Domains'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
