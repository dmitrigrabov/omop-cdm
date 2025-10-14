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
import { z } from 'zod'

export type UsePatchApiVocabularysVocabularyIdArgs = {
  vocabulary_id: string
  body: VocabularyVocabularyUpdate
}

export const usePatchApiVocabularysVocabularyId = (
  args: UseMutationOptions<
    VocabularyVocabulary,
    Error,
    UsePatchApiVocabularysVocabularyIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      vocabulary_id,
      body,
    }: UsePatchApiVocabularysVocabularyIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/vocabularys/${vocabulary_id}`,
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
