import { derivedDrugEra } from '@/types/derivedDrugEra.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDrugErasIdArgs = { id: number }

export const useGetApiDrugErasId = ({ id }: UseGetApiDrugErasIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - DrugEras', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-eras/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return derivedDrugEra.parse(data)
    },
  })

  return result
}
