import { VocabularyRelationshipCreate } from '@/types/vocabularyRelationshipCreate.generated.ts'
import {
  vocabularyRelationship,
  VocabularyRelationship,
} from '@/types/vocabularyRelationship.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiRelationshipsRelationshipIdArgs = {
  relationship_id: string
  body: VocabularyRelationshipCreate
}

export const useUpdateApiRelationshipsRelationshipId = (
  args: UseMutationOptions<
    VocabularyRelationship,
    Error,
    UseUpdateApiRelationshipsRelationshipIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      relationship_id,
      body,
    }: UseUpdateApiRelationshipsRelationshipIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships/${relationship_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyRelationship.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - Relationships'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
