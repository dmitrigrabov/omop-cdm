import { clinicalDrugExposure } from '@/types/clinicalDrugExposure.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDrugExposuresIdArgs = { id: number }

export const useGetApiDrugExposuresId = ({
  id,
}: UseGetApiDrugExposuresIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - DrugExposures', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-exposures/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalDrugExposure.parse(data)
    },
  })

  return result
}
