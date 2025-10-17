import { clinicalVisitOccurrence } from '@/types/clinicalVisitOccurrence.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiVisitOccurrencesIdArgs = { id: number }

export const useGetApiVisitOccurrencesId = ({
  id,
}: UseGetApiVisitOccurrencesIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - VisitOccurrences', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-occurrences/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalVisitOccurrence.parse(data)
    },
  })

  return result
}
