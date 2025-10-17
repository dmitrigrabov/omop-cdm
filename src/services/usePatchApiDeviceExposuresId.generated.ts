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

export type UsePatchApiDeviceExposuresIdArgs = {
  id: number
  body: ClinicalDeviceExposureUpdate
}

export const usePatchApiDeviceExposuresId = (
  args: UseMutationOptions<
    ClinicalDeviceExposure,
    Error,
    UsePatchApiDeviceExposuresIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiDeviceExposuresIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/device-exposures/${id}`,
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
