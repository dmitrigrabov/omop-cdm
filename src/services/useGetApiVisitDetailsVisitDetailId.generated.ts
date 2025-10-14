import { clinicalVisitDetail } from '@/types/clinicalVisitDetail.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiVisitDetailsVisitDetailIdArgs = { visit_detail_id: number }

export const useGetApiVisitDetailsVisitDetailId = ({
  visit_detail_id,
}: UseGetApiVisitDetailsVisitDetailIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - VisitDetails', visit_detail_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-details/${visit_detail_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalVisitDetail.parse(data)
    },
  })

  return result
}
