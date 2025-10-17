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

export type UseUpdateApiRelationshipsIdArgs = {
  id: string
  body: VocabularyRelationshipCreate
}

export const useUpdateApiRelationshipsId = (
  args: UseMutationOptions<
    VocabularyRelationship,
    Error,
    UseUpdateApiRelationshipsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiRelationshipsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships/${id}`,
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
