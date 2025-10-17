import { VocabularyConceptRelationshipUpdate } from '@/types/vocabularyConceptRelationshipUpdate.generated.ts'
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

export type UsePatchApiConceptRelationshipsIdArgs = {
  id: number
  body: VocabularyConceptRelationshipUpdate
}

export const usePatchApiConceptRelationshipsId = (
  args: UseMutationOptions<
    VocabularyConceptRelationship,
    Error,
    UsePatchApiConceptRelationshipsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiConceptRelationshipsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-relationships/${id}`,
        {
          method: 'PATCH',
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
