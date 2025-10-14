import { VocabularyConceptSynonymCreate } from '@/types/vocabularyConceptSynonymCreate.generated.ts'
import {
  vocabularyConceptSynonym,
  VocabularyConceptSynonym,
} from '@/types/vocabularyConceptSynonym.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseCreateApiConceptSynonymsArgs = {
  body: VocabularyConceptSynonymCreate
}

export const useCreateApiConceptSynonyms = (
  args: UseMutationOptions<
    VocabularyConceptSynonym,
    Error,
    UseCreateApiConceptSynonymsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiConceptSynonymsArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms`,
        {
          method: 'POST',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptSynonym.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptSynonyms'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
