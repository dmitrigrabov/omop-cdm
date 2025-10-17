import { resultsCohort } from '@/types/resultsCohort.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiCohortsIdArgs = { id: string }

export const useGetApiCohortsId = ({ id }: UseGetApiCohortsIdArgs) => {
  const result = useQuery({
    queryKey: ['Results - Cohorts', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/cohorts/${id}`,
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
