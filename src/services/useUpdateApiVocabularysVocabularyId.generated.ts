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

export type UseUpdateApiVocabularysVocabularyIdArgs = {
  vocabulary_id: string
  body: VocabularyVocabularyCreate
}

export const useUpdateApiVocabularysVocabularyId = (
  args: UseMutationOptions<
    VocabularyVocabulary,
    Error,
    UseUpdateApiVocabularysVocabularyIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      vocabulary_id,
      body,
    }: UseUpdateApiVocabularysVocabularyIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/vocabularys/${vocabulary_id}`,
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
