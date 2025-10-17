import { clinicalProcedureOccurrence } from '@/types/clinicalProcedureOccurrence.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiProcedureOccurrencesIdArgs = { id: string }

export const useGetApiProcedureOccurrencesId = ({
  id,
}: UseGetApiProcedureOccurrencesIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - ProcedureOccurrences', id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/procedure-occurrences/${id}`,
        {
          method: 'GET',
        },
      )

      if (error) {
        throw error
      }

      return clinicalProcedureOccurrence.parse(data)
    },
  })

  return result
}
