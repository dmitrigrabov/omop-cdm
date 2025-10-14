import { clinicalConditionOccurrence } from '@/types/clinicalConditionOccurrence.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConditionOccurrencesConditionOccurrenceIdArgs = {
  condition_occurrence_id: number
}

export const useGetApiConditionOccurrencesConditionOccurrenceId = ({
  condition_occurrence_id,
}: UseGetApiConditionOccurrencesConditionOccurrenceIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - ConditionOccurrences', condition_occurrence_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-occurrences/${condition_occurrence_id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalConditionOccurrence.parse(data)
    },
  })

  return result
}
