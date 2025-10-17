import { VocabularyConceptAncestorCreate } from '@/types/vocabularyConceptAncestorCreate.generated.ts'
import {
  vocabularyConceptAncestor,
  VocabularyConceptAncestor,
} from '@/types/vocabularyConceptAncestor.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseCreateApiConceptAncestorsArgs = {
  body: VocabularyConceptAncestorCreate
}

export const useCreateApiConceptAncestors = (
  args: UseMutationOptions<
    VocabularyConceptAncestor,
    Error,
    UseCreateApiConceptAncestorsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiConceptAncestorsArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-ancestors`,
        {
          method: 'POST',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptAncestor.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptAncestors'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
