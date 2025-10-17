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

export type UseUpdateApiProcedureOccurrencesIdArgs = {
  id: number
  body: ClinicalProcedureOccurrenceCreate
}

export const useUpdateApiProcedureOccurrencesId = (
  args: UseMutationOptions<
    ClinicalProcedureOccurrence,
    Error,
    UseUpdateApiProcedureOccurrencesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: UseUpdateApiProcedureOccurrencesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/procedure-occurrences/${id}`,
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
