import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiCohortDefinitionsCohortDefinitionIdArgs = {
  cohort_definition_id: number
}

export const useDeleteApiCohortDefinitionsCohortDefinitionIdResponse = z.void()

export type UseDeleteApiCohortDefinitionsCohortDefinitionIdResponse = void

export type DeleteApiCohortDefinitionsCohortDefinitionIdBody = void

export const useDeleteApiCohortDefinitionsCohortDefinitionId = (
  args: UseMutationOptions<
    UseDeleteApiCohortDefinitionsCohortDefinitionIdResponse,
    Error,
    UseDeleteApiCohortDefinitionsCohortDefinitionIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      cohort_definition_id,
    }: UseDeleteApiCohortDefinitionsCohortDefinitionIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions/${cohort_definition_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiCohortDefinitionsCohortDefinitionIdResponse.parse(data)
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
