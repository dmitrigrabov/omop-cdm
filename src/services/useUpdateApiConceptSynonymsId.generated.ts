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

export type UseUpdateApiConceptSynonymsIdArgs = {
  id: number
  body: VocabularyConceptSynonymCreate
}

export const useUpdateApiConceptSynonymsId = (
  args: UseMutationOptions<
    VocabularyConceptSynonym,
    Error,
    UseUpdateApiConceptSynonymsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiConceptSynonymsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms/${id}`,
        {
          method: 'PUT',
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
