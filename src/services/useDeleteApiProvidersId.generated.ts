import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiProvidersIdArgs = { id: number }

export const useDeleteApiProvidersIdResponse = z.void()

export type UseDeleteApiProvidersIdResponse = void

export type DeleteApiProvidersIdBody = void

export const useDeleteApiProvidersId = (
  args: UseMutationOptions<
    UseDeleteApiProvidersIdResponse,
    Error,
    UseDeleteApiProvidersIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiProvidersIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/providers/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiProvidersIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - Providers'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
