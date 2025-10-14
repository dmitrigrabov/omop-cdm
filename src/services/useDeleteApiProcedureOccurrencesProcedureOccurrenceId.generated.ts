import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiProcedureOccurrencesProcedureOccurrenceIdArgs = {
  procedure_occurrence_id: number
}

export const useDeleteApiProcedureOccurrencesProcedureOccurrenceIdResponse =
  z.void()

export type UseDeleteApiProcedureOccurrencesProcedureOccurrenceIdResponse = void

export type DeleteApiProcedureOccurrencesProcedureOccurrenceIdBody = void

export const useDeleteApiProcedureOccurrencesProcedureOccurrenceId = (
  args: UseMutationOptions<
    UseDeleteApiProcedureOccurrencesProcedureOccurrenceIdResponse,
    Error,
    UseDeleteApiProcedureOccurrencesProcedureOccurrenceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      procedure_occurrence_id,
    }: UseDeleteApiProcedureOccurrencesProcedureOccurrenceIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/procedure-occurrences/${procedure_occurrence_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiProcedureOccurrencesProcedureOccurrenceIdResponse.parse(
        data,
      )
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
