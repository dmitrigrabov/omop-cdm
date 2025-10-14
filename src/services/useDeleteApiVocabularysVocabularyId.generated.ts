import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiVocabularysVocabularyIdArgs = { vocabulary_id: string }

export const useDeleteApiVocabularysVocabularyIdResponse = z.void()

export type UseDeleteApiVocabularysVocabularyIdResponse = void

export type DeleteApiVocabularysVocabularyIdBody = void

export const useDeleteApiVocabularysVocabularyId = (
  args: UseMutationOptions<
    UseDeleteApiVocabularysVocabularyIdResponse,
    Error,
    UseDeleteApiVocabularysVocabularyIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      vocabulary_id,
    }: UseDeleteApiVocabularysVocabularyIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/vocabularys/${vocabulary_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiVocabularysVocabularyIdResponse.parse(data)
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
