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

export type UseCreateApiDomainsArgs = { body: VocabularyDomainCreate }

export const useCreateApiDomains = (
  args: UseMutationOptions<
    VocabularyDomain,
    Error,
    UseCreateApiDomainsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiDomainsArgs) => {
      const { data, error } = await supabase.functions.invoke(`/domains`, {
        method: 'POST',
        body,
      })

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
