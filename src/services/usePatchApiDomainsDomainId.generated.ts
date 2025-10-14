import { VocabularyDomainUpdate } from '@/types/vocabularyDomainUpdate.generated.ts'
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

export type UsePatchApiDomainsDomainIdArgs = {
  domain_id: string
  body: VocabularyDomainUpdate
}

export const usePatchApiDomainsDomainId = (
  args: UseMutationOptions<
    VocabularyDomain,
    Error,
    UsePatchApiDomainsDomainIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ domain_id, body }: UsePatchApiDomainsDomainIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/domains/${domain_id}`,
        {
          method: 'PATCH',
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
