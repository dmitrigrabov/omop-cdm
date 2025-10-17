import { derivedDoseEra } from '@/types/derivedDoseEra.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDoseErasIdArgs = { id: number }

export const useGetApiDoseErasId = ({ id }: UseGetApiDoseErasIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - DoseEras', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/dose-eras/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return derivedDoseEra.parse(data)
    },
  })

  return result
}
