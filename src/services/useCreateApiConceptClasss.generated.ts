import { VocabularyConceptClassCreate } from '@/types/vocabularyConceptClassCreate.generated.ts'
import {
  vocabularyConceptClass,
  VocabularyConceptClass,
} from '@/types/vocabularyConceptClass.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseCreateApiConceptClasssArgs = {
  body: VocabularyConceptClassCreate
}

export const useCreateApiConceptClasss = (
  args: UseMutationOptions<
    VocabularyConceptClass,
    Error,
    UseCreateApiConceptClasssArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiConceptClasssArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs`,
        {
          method: 'POST',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptClass.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptClasss'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
