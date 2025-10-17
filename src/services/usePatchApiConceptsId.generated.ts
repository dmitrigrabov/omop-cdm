import { VocabularyConceptUpdate } from '@/types/vocabularyConceptUpdate.generated.ts'
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

export type UsePatchApiConceptsIdArgs = {
  id: string
  body: VocabularyConceptUpdate
}

export const usePatchApiConceptsId = (
  args: UseMutationOptions<
    VocabularyConcept,
    Error,
    UsePatchApiConceptsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiConceptsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concepts/${id}`,
        {
          method: 'PATCH',
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
