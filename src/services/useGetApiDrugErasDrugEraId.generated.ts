import { derivedDrugEra } from '@/types/derivedDrugEra.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDrugErasDrugEraIdArgs = { drug_era_id: number }

export const useGetApiDrugErasDrugEraId = ({
  drug_era_id,
}: UseGetApiDrugErasDrugEraIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - DrugEras', drug_era_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-eras/${drug_era_id}`,
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
