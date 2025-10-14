import { clinicalDeviceExposure } from '@/types/clinicalDeviceExposure.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDeviceExposuresDeviceExposureIdArgs = {
  device_exposure_id: number
}

export const useGetApiDeviceExposuresDeviceExposureId = ({
  device_exposure_id,
}: UseGetApiDeviceExposuresDeviceExposureIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - DeviceExposures', device_exposure_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/device-exposures/${device_exposure_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalDeviceExposure.parse(data)
    },
  })

  return result
}
