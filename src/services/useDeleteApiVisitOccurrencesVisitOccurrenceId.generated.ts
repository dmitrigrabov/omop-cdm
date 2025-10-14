import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiVisitOccurrencesVisitOccurrenceIdArgs = {
  visit_occurrence_id: number
}

export const useDeleteApiVisitOccurrencesVisitOccurrenceIdResponse = z.void()

export type UseDeleteApiVisitOccurrencesVisitOccurrenceIdResponse = void

export type DeleteApiVisitOccurrencesVisitOccurrenceIdBody = void

export const useDeleteApiVisitOccurrencesVisitOccurrenceId = (
  args: UseMutationOptions<
    UseDeleteApiVisitOccurrencesVisitOccurrenceIdResponse,
    Error,
    UseDeleteApiVisitOccurrencesVisitOccurrenceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      visit_occurrence_id,
    }: UseDeleteApiVisitOccurrencesVisitOccurrenceIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-occurrences/${visit_occurrence_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiVisitOccurrencesVisitOccurrenceIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - VisitOccurrences'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
