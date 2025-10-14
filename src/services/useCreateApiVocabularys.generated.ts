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
import { z } from 'zod'

export type UseCreateApiVocabularysArgs = { body: VocabularyVocabularyCreate }

export const useCreateApiVocabularys = (
  args: UseMutationOptions<
    VocabularyVocabulary,
    Error,
    UseCreateApiVocabularysArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiVocabularysArgs) => {
      const { data, error } = await supabase.functions.invoke(`/vocabularys`, {
        method: 'POST',
        body,
      })

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
