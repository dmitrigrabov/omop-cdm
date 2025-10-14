import { derivedDoseEra } from '@/types/derivedDoseEra.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiDoseErasDoseEraIdArgs = { dose_era_id: number }

export const useGetApiDoseErasDoseEraId = ({
  dose_era_id,
}: UseGetApiDoseErasDoseEraIdArgs) => {
  const result = useQuery({
    queryKey: ['Derived - DoseEras', dose_era_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/dose-eras/${dose_era_id}`,
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
