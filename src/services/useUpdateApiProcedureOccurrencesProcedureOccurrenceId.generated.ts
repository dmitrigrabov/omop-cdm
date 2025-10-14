import { ClinicalProcedureOccurrenceCreate } from '@/types/clinicalProcedureOccurrenceCreate.generated.ts'
import {
  clinicalProcedureOccurrence,
  ClinicalProcedureOccurrence,
} from '@/types/clinicalProcedureOccurrence.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiProcedureOccurrencesProcedureOccurrenceIdArgs = {
  procedure_occurrence_id: number
  body: ClinicalProcedureOccurrenceCreate
}

export const useUpdateApiProcedureOccurrencesProcedureOccurrenceId = (
  args: UseMutationOptions<
    ClinicalProcedureOccurrence,
    Error,
    UseUpdateApiProcedureOccurrencesProcedureOccurrenceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      procedure_occurrence_id,
      body,
    }: UseUpdateApiProcedureOccurrencesProcedureOccurrenceIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/procedure-occurrences/${procedure_occurrence_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalProcedureOccurrence.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - ProcedureOccurrences'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
