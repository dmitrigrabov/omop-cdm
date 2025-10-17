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

export type UseUpdateApiConceptClasssIdArgs = {
  id: string
  body: VocabularyConceptClassCreate
}

export const useUpdateApiConceptClasssId = (
  args: UseMutationOptions<
    VocabularyConceptClass,
    Error,
    UseUpdateApiConceptClasssIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiConceptClasssIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs/${id}`,
        {
          method: 'PUT',
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
