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

export type UsePatchApiDomainsIdArgs = {
  id: string
  body: VocabularyDomainUpdate
}

export const usePatchApiDomainsId = (
  args: UseMutationOptions<
    VocabularyDomain,
    Error,
    UsePatchApiDomainsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiDomainsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/domains/${id}`,
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
