import { ResultsCohortDefinitionUpdate } from '@/types/resultsCohortDefinitionUpdate.generated.ts'
import {
  resultsCohortDefinition,
  ResultsCohortDefinition,
} from '@/types/resultsCohortDefinition.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiCohortDefinitionsCohortDefinitionIdArgs = {
  cohort_definition_id: number
  body: ResultsCohortDefinitionUpdate
}

export const usePatchApiCohortDefinitionsCohortDefinitionId = (
  args: UseMutationOptions<
    ResultsCohortDefinition,
    Error,
    UsePatchApiCohortDefinitionsCohortDefinitionIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      cohort_definition_id,
      body,
    }: UsePatchApiCohortDefinitionsCohortDefinitionIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions/${cohort_definition_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return resultsCohortDefinition.parse(data)
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
