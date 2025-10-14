import { healthsystemProvider } from '@/types/healthsystemProvider.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiProvidersProviderIdArgs = { provider_id: number }

export const useGetApiProvidersProviderId = ({
  provider_id,
}: UseGetApiProvidersProviderIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - Providers', provider_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/providers/${provider_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return healthsystemProvider.parse(data)
    },
  })

  return result
}
