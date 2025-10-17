import { clinicalVisitDetail } from '@/types/clinicalVisitDetail.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiVisitDetailsIdArgs = { id: string }

export const useGetApiVisitDetailsId = ({
  id,
}: UseGetApiVisitDetailsIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - VisitDetails', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-details/${id}`,
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
