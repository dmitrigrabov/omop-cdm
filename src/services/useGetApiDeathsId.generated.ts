import { clinicalDeath } from '@/types/clinicalDeath.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDeathsIdArgs = { id: number }

export const useGetApiDeathsId = ({ id }: UseGetApiDeathsIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - Deaths', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/deaths/${id}`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return clinicalDeath.parse(data)
    },
  })

  return result
}
