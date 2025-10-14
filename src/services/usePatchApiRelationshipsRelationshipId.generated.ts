import { VocabularyRelationshipUpdate } from '@/types/vocabularyRelationshipUpdate.generated.ts'
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

export type UsePatchApiRelationshipsRelationshipIdArgs = {
  relationship_id: string
  body: VocabularyRelationshipUpdate
}

export const usePatchApiRelationshipsRelationshipId = (
  args: UseMutationOptions<
    VocabularyRelationship,
    Error,
    UsePatchApiRelationshipsRelationshipIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      relationship_id,
      body,
    }: UsePatchApiRelationshipsRelationshipIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships/${relationship_id}`,
        {
          method: 'PATCH',
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
