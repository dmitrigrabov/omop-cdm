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

export type UseUpdateApiConceptRelationshipsIdArgs = {
  id: string
  body: VocabularyConceptRelationshipCreate
}

export const useUpdateApiConceptRelationshipsId = (
  args: UseMutationOptions<
    VocabularyConceptRelationship,
    Error,
    UseUpdateApiConceptRelationshipsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: UseUpdateApiConceptRelationshipsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-relationships/${id}`,
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
