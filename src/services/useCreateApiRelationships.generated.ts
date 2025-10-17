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

export type UseCreateApiRelationshipsArgs = {
  body: VocabularyRelationshipCreate
}

export const useCreateApiRelationships = (
  args: UseMutationOptions<
    VocabularyRelationship,
    Error,
    UseCreateApiRelationshipsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiRelationshipsArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships`,
        {
          method: 'POST',
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
