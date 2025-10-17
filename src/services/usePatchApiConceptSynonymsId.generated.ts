import { VocabularyConceptSynonymUpdate } from '@/types/vocabularyConceptSynonymUpdate.generated.ts'
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

export type UsePatchApiConceptSynonymsIdArgs = {
  id: string
  body: VocabularyConceptSynonymUpdate
}

export const usePatchApiConceptSynonymsId = (
  args: UseMutationOptions<
    VocabularyConceptSynonym,
    Error,
    UsePatchApiConceptSynonymsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiConceptSynonymsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms/${id}`,
        {
          method: 'PATCH',
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
