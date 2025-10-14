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

export type UseUpdateApiConceptRelationshipsConceptRelationshipIdArgs = {
  concept_relationship_id: number
  body: VocabularyConceptRelationshipCreate
}

export const useUpdateApiConceptRelationshipsConceptRelationshipId = (
  args: UseMutationOptions<
    VocabularyConceptRelationship,
    Error,
    UseUpdateApiConceptRelationshipsConceptRelationshipIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_relationship_id,
      body,
    }: UseUpdateApiConceptRelationshipsConceptRelationshipIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-relationships/${concept_relationship_id}`,
        {
          method: 'PUT',
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
