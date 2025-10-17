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

export type UsePatchApiRelationshipsIdArgs = {
  id: string
  body: VocabularyRelationshipUpdate
}

export const usePatchApiRelationshipsId = (
  args: UseMutationOptions<
    VocabularyRelationship,
    Error,
    UsePatchApiRelationshipsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiRelationshipsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships/${id}`,
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
