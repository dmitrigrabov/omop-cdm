import { VocabularyVocabularyCreate } from '@/types/vocabularyVocabularyCreate.generated.ts'
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

export type UseUpdateApiVocabularysIdArgs = {
  id: string
  body: VocabularyVocabularyCreate
}

export const useUpdateApiVocabularysId = (
  args: UseMutationOptions<
    VocabularyVocabulary,
    Error,
    UseUpdateApiVocabularysIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiVocabularysIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/vocabularys/${id}`,
        {
          method: 'PUT',
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
