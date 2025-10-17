import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCareSitesIdArgs = { id: string }

export const useDeleteApiCareSitesIdResponse = z.void()

export type UseDeleteApiCareSitesIdResponse = void

export type DeleteApiCareSitesIdBody = void

export const useDeleteApiCareSitesId = (
  args: UseMutationOptions<
    UseDeleteApiCareSitesIdResponse,
    Error,
    UseDeleteApiCareSitesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiCareSitesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/care-sites/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiCareSitesIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - CareSites'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
