import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConditionOccurrencesConditionOccurrenceIdArgs = {
  condition_occurrence_id: number
}

export const useDeleteApiConditionOccurrencesConditionOccurrenceIdResponse =
  z.void()

export type UseDeleteApiConditionOccurrencesConditionOccurrenceIdResponse = void

export type DeleteApiConditionOccurrencesConditionOccurrenceIdBody = void

export const useDeleteApiConditionOccurrencesConditionOccurrenceId = (
  args: UseMutationOptions<
    UseDeleteApiConditionOccurrencesConditionOccurrenceIdResponse,
    Error,
    UseDeleteApiConditionOccurrencesConditionOccurrenceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      condition_occurrence_id,
    }: UseDeleteApiConditionOccurrencesConditionOccurrenceIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-occurrences/${condition_occurrence_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConditionOccurrencesConditionOccurrenceIdResponse.parse(
        data,
      )
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
