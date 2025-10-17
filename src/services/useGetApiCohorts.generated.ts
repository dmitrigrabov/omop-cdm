import { resultsCohortList } from '@/types/resultsCohortList.generated.ts'
import { CommonSortOrder } from '@/types/commonSortOrder.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery, keepPreviousData } from '@tanstack/react-query'

export type UseGetApiCohortsArgs = {
  offset?: number | undefined
  limit?: number | undefined
  sort_by?: 'id' | undefined
  sort_order?: CommonSortOrder | undefined
}

export const useGetApiCohorts = ({
  offset,
  limit,
  sort_by,
  sort_order,
}: UseGetApiCohortsArgs) => {
  const result = useQuery({
    queryKey: ['Results - Cohorts', offset, limit, sort_by, sort_order],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(`/cohorts`, {
        method: 'GET',
      })

      if (error) {
        throw error
      }

      return resultsCohortList.parse(data)
    },
    placeholderData: keepPreviousData,
  })

  return result
}
