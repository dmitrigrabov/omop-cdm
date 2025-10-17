import { clinicalDeviceExposure } from '@/types/clinicalDeviceExposure.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDeviceExposuresIdArgs = { id: string }

export const useGetApiDeviceExposuresId = ({
  id,
}: UseGetApiDeviceExposuresIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - DeviceExposures', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/device-exposures/${id}`,
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
