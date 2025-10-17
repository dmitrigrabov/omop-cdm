import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConditionOccurrencesIdArgs = { id: number }

export const useDeleteApiConditionOccurrencesIdResponse = z.void()

export type UseDeleteApiConditionOccurrencesIdResponse = void

export type DeleteApiConditionOccurrencesIdBody = void

export const useDeleteApiConditionOccurrencesId = (
  args: UseMutationOptions<
    UseDeleteApiConditionOccurrencesIdResponse,
    Error,
    UseDeleteApiConditionOccurrencesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiConditionOccurrencesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-occurrences/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConditionOccurrencesIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - ConditionOccurrences'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
