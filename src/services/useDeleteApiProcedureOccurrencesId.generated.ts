import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiProcedureOccurrencesIdArgs = { id: string }

export const useDeleteApiProcedureOccurrencesIdResponse = z.void()

export type UseDeleteApiProcedureOccurrencesIdResponse = void

export type DeleteApiProcedureOccurrencesIdBody = void

export const useDeleteApiProcedureOccurrencesId = (
  args: UseMutationOptions<
    UseDeleteApiProcedureOccurrencesIdResponse,
    Error,
    UseDeleteApiProcedureOccurrencesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiProcedureOccurrencesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/procedure-occurrences/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiProcedureOccurrencesIdResponse.parse(data)
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
