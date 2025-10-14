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
import { z } from 'zod'

export type UsePatchApiConceptSynonymsConceptSynonymIdArgs = {
  concept_synonym_id: number
  body: VocabularyConceptSynonymUpdate
}

export const usePatchApiConceptSynonymsConceptSynonymId = (
  args: UseMutationOptions<
    VocabularyConceptSynonym,
    Error,
    UsePatchApiConceptSynonymsConceptSynonymIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_synonym_id,
      body,
    }: UsePatchApiConceptSynonymsConceptSynonymIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms/${concept_synonym_id}`,
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
