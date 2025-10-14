import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiProvidersProviderIdArgs = { provider_id: number }

export const useDeleteApiProvidersProviderIdResponse = z.void()

export type UseDeleteApiProvidersProviderIdResponse = void

export type DeleteApiProvidersProviderIdBody = void

export const useDeleteApiProvidersProviderId = (
  args: UseMutationOptions<
    UseDeleteApiProvidersProviderIdResponse,
    Error,
    UseDeleteApiProvidersProviderIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      provider_id,
    }: UseDeleteApiProvidersProviderIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/providers/${provider_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiProvidersProviderIdResponse.parse(data)
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
