import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDeviceExposuresDeviceExposureIdArgs = {
  device_exposure_id: number
}

export const useDeleteApiDeviceExposuresDeviceExposureIdResponse = z.void()

export type UseDeleteApiDeviceExposuresDeviceExposureIdResponse = void

export type DeleteApiDeviceExposuresDeviceExposureIdBody = void

export const useDeleteApiDeviceExposuresDeviceExposureId = (
  args: UseMutationOptions<
    UseDeleteApiDeviceExposuresDeviceExposureIdResponse,
    Error,
    UseDeleteApiDeviceExposuresDeviceExposureIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      device_exposure_id,
    }: UseDeleteApiDeviceExposuresDeviceExposureIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/device-exposures/${device_exposure_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDeviceExposuresDeviceExposureIdResponse.parse(data)
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
