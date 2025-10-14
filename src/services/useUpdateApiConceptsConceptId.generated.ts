import { VocabularyConceptCreate } from '@/types/vocabularyConceptCreate.generated.ts'
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

export type UseUpdateApiConceptsConceptIdArgs = {
  concept_id: number
  body: VocabularyConceptCreate
}

export const useUpdateApiConceptsConceptId = (
  args: UseMutationOptions<
    VocabularyConcept,
    Error,
    UseUpdateApiConceptsConceptIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_id,
      body,
    }: UseUpdateApiConceptsConceptIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concepts/${concept_id}`,
        {
          method: 'PUT',
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
