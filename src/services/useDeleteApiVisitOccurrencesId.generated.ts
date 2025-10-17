import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiVisitOccurrencesIdArgs = { id: number }

export const useDeleteApiVisitOccurrencesIdResponse = z.void()

export type UseDeleteApiVisitOccurrencesIdResponse = void

export type DeleteApiVisitOccurrencesIdBody = void

export const useDeleteApiVisitOccurrencesId = (
  args: UseMutationOptions<
    UseDeleteApiVisitOccurrencesIdResponse,
    Error,
    UseDeleteApiVisitOccurrencesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiVisitOccurrencesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-occurrences/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiVisitOccurrencesIdResponse.parse(data)
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
