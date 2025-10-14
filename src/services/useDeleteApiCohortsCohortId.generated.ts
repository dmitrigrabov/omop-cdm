import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCohortsCohortIdArgs = { cohort_id: number }

export const useDeleteApiCohortsCohortIdResponse = z.void()

export type UseDeleteApiCohortsCohortIdResponse = void

export type DeleteApiCohortsCohortIdBody = void

export const useDeleteApiCohortsCohortId = (
  args: UseMutationOptions<
    UseDeleteApiCohortsCohortIdResponse,
    Error,
    UseDeleteApiCohortsCohortIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ cohort_id }: UseDeleteApiCohortsCohortIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohorts/${cohort_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiCohortsCohortIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Results - Cohorts'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
