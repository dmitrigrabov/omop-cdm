import { VocabularyConceptRelationshipCreate } from '@/types/vocabularyConceptRelationshipCreate.generated.ts'
import {
  vocabularyConceptRelationship,
  VocabularyConceptRelationship,
} from '@/types/vocabularyConceptRelationship.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseCreateApiConceptRelationshipsArgs = {
  body: VocabularyConceptRelationshipCreate
}

export const useCreateApiConceptRelationships = (
  args: UseMutationOptions<
    VocabularyConceptRelationship,
    Error,
    UseCreateApiConceptRelationshipsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiConceptRelationshipsArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-relationships`,
        {
          method: 'POST',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptRelationship.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptRelationships'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
