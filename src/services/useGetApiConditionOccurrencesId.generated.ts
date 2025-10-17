import { clinicalConditionOccurrence } from '@/types/clinicalConditionOccurrence.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiConditionOccurrencesIdArgs = { id: string }

export const useGetApiConditionOccurrencesId = ({
  id,
}: UseGetApiConditionOccurrencesIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - ConditionOccurrences', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-occurrences/${id}`,
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
