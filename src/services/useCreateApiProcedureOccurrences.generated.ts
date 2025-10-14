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

export type UseCreateApiProcedureOccurrencesArgs = {
  body: ClinicalProcedureOccurrenceCreate
}

export const useCreateApiProcedureOccurrences = (
  args: UseMutationOptions<
    ClinicalProcedureOccurrence,
    Error,
    UseCreateApiProcedureOccurrencesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiProcedureOccurrencesArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/procedure-occurrences`,
        {
          method: 'POST',
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
