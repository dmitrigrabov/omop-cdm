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

export type UseUpdateApiConceptSynonymsConceptSynonymIdArgs = {
  concept_synonym_id: number
  body: VocabularyConceptSynonymCreate
}

export const useUpdateApiConceptSynonymsConceptSynonymId = (
  args: UseMutationOptions<
    VocabularyConceptSynonym,
    Error,
    UseUpdateApiConceptSynonymsConceptSynonymIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_synonym_id,
      body,
    }: UseUpdateApiConceptSynonymsConceptSynonymIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms/${concept_synonym_id}`,
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
