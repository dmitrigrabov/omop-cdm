import { clinicalProcedureOccurrence } from '@/types/clinicalProcedureOccurrence.generated.ts'
import { supabase } from '@/lib/supabase'
import { useQuery } from '@tanstack/react-query'

export type UseGetApiProcedureOccurrencesProcedureOccurrenceIdArgs = {
  procedure_occurrence_id: number
}

export const useGetApiProcedureOccurrencesProcedureOccurrenceId = ({
  procedure_occurrence_id,
}: UseGetApiProcedureOccurrencesProcedureOccurrenceIdArgs) => {
  const result = useQuery({
    queryKey: ['Clinical - ProcedureOccurrences', procedure_occurrence_id],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        `/procedure-occurrences/${procedure_occurrence_id}`,
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
