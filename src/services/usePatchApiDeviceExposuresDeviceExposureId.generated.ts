import { ClinicalDeviceExposureUpdate } from '@/types/clinicalDeviceExposureUpdate.generated.ts'
import {
  clinicalDeviceExposure,
  ClinicalDeviceExposure,
} from '@/types/clinicalDeviceExposure.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiDeviceExposuresDeviceExposureIdArgs = {
  device_exposure_id: number
  body: ClinicalDeviceExposureUpdate
}

export const usePatchApiDeviceExposuresDeviceExposureId = (
  args: UseMutationOptions<
    ClinicalDeviceExposure,
    Error,
    UsePatchApiDeviceExposuresDeviceExposureIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      device_exposure_id,
      body,
    }: UsePatchApiDeviceExposuresDeviceExposureIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/device-exposures/${device_exposure_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalDeviceExposure.parse(data)
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
