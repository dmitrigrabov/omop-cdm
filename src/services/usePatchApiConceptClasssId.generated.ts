import { VocabularyConceptClassUpdate } from '@/types/vocabularyConceptClassUpdate.generated.ts'
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

export type UsePatchApiConceptClasssIdArgs = {
  id: string
  body: VocabularyConceptClassUpdate
}

export const usePatchApiConceptClasssId = (
  args: UseMutationOptions<
    VocabularyConceptClass,
    Error,
    UsePatchApiConceptClasssIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiConceptClasssIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-classs/${id}`,
        {
          method: 'PATCH',
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
