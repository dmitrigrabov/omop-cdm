import { VocabularyVocabularyUpdate } from '@/types/vocabularyVocabularyUpdate.generated.ts'
import {
  vocabularyVocabulary,
  VocabularyVocabulary,
} from '@/types/vocabularyVocabulary.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UsePatchApiVocabularysIdArgs = {
  id: string
  body: VocabularyVocabularyUpdate
}

export const usePatchApiVocabularysId = (
  args: UseMutationOptions<
    VocabularyVocabulary,
    Error,
    UsePatchApiVocabularysIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiVocabularysIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/vocabularys/${id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyVocabulary.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - Vocabularys'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
