import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiVocabularysIdArgs = { id: string }

export const useDeleteApiVocabularysIdResponse = z.void()

export type UseDeleteApiVocabularysIdResponse = void

export type DeleteApiVocabularysIdBody = void

export const useDeleteApiVocabularysId = (
  args: UseMutationOptions<
    UseDeleteApiVocabularysIdResponse,
    Error,
    UseDeleteApiVocabularysIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiVocabularysIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/vocabularys/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiVocabularysIdResponse.parse(data)
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
