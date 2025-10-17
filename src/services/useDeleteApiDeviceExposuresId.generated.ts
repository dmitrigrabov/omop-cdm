import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDeviceExposuresIdArgs = { id: string }

export const useDeleteApiDeviceExposuresIdResponse = z.void()

export type UseDeleteApiDeviceExposuresIdResponse = void

export type DeleteApiDeviceExposuresIdBody = void

export const useDeleteApiDeviceExposuresId = (
  args: UseMutationOptions<
    UseDeleteApiDeviceExposuresIdResponse,
    Error,
    UseDeleteApiDeviceExposuresIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiDeviceExposuresIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/device-exposures/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDeviceExposuresIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - DeviceExposures'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
