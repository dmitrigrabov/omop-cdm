import { VocabularyConceptCreate } from '@/types/vocabularyConceptCreate.generated.ts'
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

export type UseUpdateApiConceptsIdArgs = {
  id: number
  body: VocabularyConceptCreate
}

export const useUpdateApiConceptsId = (
  args: UseMutationOptions<
    VocabularyConcept,
    Error,
    UseUpdateApiConceptsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiConceptsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concepts/${id}`,
        {
          method: 'PUT',
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
