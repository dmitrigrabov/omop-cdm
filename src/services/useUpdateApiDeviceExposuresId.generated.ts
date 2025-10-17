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

export type UseUpdateApiDeviceExposuresIdArgs = {
  id: number
  body: ClinicalDeviceExposureCreate
}

export const useUpdateApiDeviceExposuresId = (
  args: UseMutationOptions<
    ClinicalDeviceExposure,
    Error,
    UseUpdateApiDeviceExposuresIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiDeviceExposuresIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/device-exposures/${id}`,
        {
          method: 'PUT',
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
