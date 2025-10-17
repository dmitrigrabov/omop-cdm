import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCohortDefinitionsIdArgs = { id: number }

export const useDeleteApiCohortDefinitionsIdResponse = z.void()

export type UseDeleteApiCohortDefinitionsIdResponse = void

export type DeleteApiCohortDefinitionsIdBody = void

export const useDeleteApiCohortDefinitionsId = (
  args: UseMutationOptions<
    UseDeleteApiCohortDefinitionsIdResponse,
    Error,
    UseDeleteApiCohortDefinitionsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiCohortDefinitionsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiCohortDefinitionsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Results - CohortDefinitions'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
