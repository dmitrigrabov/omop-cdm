import { resultsCohort } from '@/types/resultsCohort.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCohortsCohortIdArgs = { cohort_id: number }

export const useGetApiCohortsCohortId = ({
  cohort_id,
}: UseGetApiCohortsCohortIdArgs) => {
  const result = useQuery({
    queryKey: ['Results - Cohorts', cohort_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/cohorts/${cohort_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return resultsCohort.parse(data)
    },
  })

  return result
}
