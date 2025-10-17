import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiVisitDetailsIdArgs = { id: string }

export const useDeleteApiVisitDetailsIdResponse = z.void()

export type UseDeleteApiVisitDetailsIdResponse = void

export type DeleteApiVisitDetailsIdBody = void

export const useDeleteApiVisitDetailsId = (
  args: UseMutationOptions<
    UseDeleteApiVisitDetailsIdResponse,
    Error,
    UseDeleteApiVisitDetailsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiVisitDetailsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-details/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiVisitDetailsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - VisitDetails'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
