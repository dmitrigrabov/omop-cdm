import { VocabularyConceptUpdate } from '@/types/vocabularyConceptUpdate.generated.ts'
import {
  vocabularyConcept,
  VocabularyConcept,
} from '@/types/vocabularyConcept.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiConceptsConceptIdArgs = {
  concept_id: number
  body: VocabularyConceptUpdate
}

export const usePatchApiConceptsConceptId = (
  args: UseMutationOptions<
    VocabularyConcept,
    Error,
    UsePatchApiConceptsConceptIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_id,
      body,
    }: UsePatchApiConceptsConceptIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concepts/${concept_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConcept.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - Concepts'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
