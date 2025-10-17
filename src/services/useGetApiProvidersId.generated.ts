import { healthsystemProvider } from '@/types/healthsystemProvider.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiProvidersIdArgs = { id: string }

export const useGetApiProvidersId = ({ id }: UseGetApiProvidersIdArgs) => {
  const result = useQuery({
    queryKey: ['Health System - Providers', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/providers/${id}`,
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
