import { ClinicalProcedureOccurrenceUpdate } from '@/types/clinicalProcedureOccurrenceUpdate.generated.ts'
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

export type UsePatchApiProcedureOccurrencesIdArgs = {
  id: number
  body: ClinicalProcedureOccurrenceUpdate
}

export const usePatchApiProcedureOccurrencesId = (
  args: UseMutationOptions<
    ClinicalProcedureOccurrence,
    Error,
    UsePatchApiProcedureOccurrencesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiProcedureOccurrencesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/procedure-occurrences/${id}`,
        {
          method: 'PATCH',
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
