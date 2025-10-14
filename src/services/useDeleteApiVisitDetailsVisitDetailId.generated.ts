import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiVisitDetailsVisitDetailIdArgs = {
  visit_detail_id: number
}

export const useDeleteApiVisitDetailsVisitDetailIdResponse = z.void()

export type UseDeleteApiVisitDetailsVisitDetailIdResponse = void

export type DeleteApiVisitDetailsVisitDetailIdBody = void

export const useDeleteApiVisitDetailsVisitDetailId = (
  args: UseMutationOptions<
    UseDeleteApiVisitDetailsVisitDetailIdResponse,
    Error,
    UseDeleteApiVisitDetailsVisitDetailIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      visit_detail_id,
    }: UseDeleteApiVisitDetailsVisitDetailIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-details/${visit_detail_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiVisitDetailsVisitDetailIdResponse.parse(data)
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
