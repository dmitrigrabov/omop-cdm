import { clinicalVisitOccurrence } from '@/types/clinicalVisitOccurrence.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiVisitOccurrencesVisitOccurrenceIdArgs = {
  visit_occurrence_id: number
}

export const useGetApiVisitOccurrencesVisitOccurrenceId = ({
  visit_occurrence_id,
}: UseGetApiVisitOccurrencesVisitOccurrenceIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - VisitOccurrences', visit_occurrence_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-occurrences/${visit_occurrence_id}`,
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
