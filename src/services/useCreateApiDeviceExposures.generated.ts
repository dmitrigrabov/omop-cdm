import { ClinicalDeviceExposureCreate } from '@/types/clinicalDeviceExposureCreate.generated.ts'
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

export type UseCreateApiDeviceExposuresArgs = {
  body: ClinicalDeviceExposureCreate
}

export const useCreateApiDeviceExposures = (
  args: UseMutationOptions<
    ClinicalDeviceExposure,
    Error,
    UseCreateApiDeviceExposuresArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiDeviceExposuresArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/device-exposures`,
        {
          method: 'POST',
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
