import { ResultsCohortDefinitionCreate } from '@/types/resultsCohortDefinitionCreate.generated.ts'
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

export type UseUpdateApiCohortDefinitionsCohortDefinitionIdArgs = {
  cohort_definition_id: number
  body: ResultsCohortDefinitionCreate
}

export const useUpdateApiCohortDefinitionsCohortDefinitionId = (
  args: UseMutationOptions<
    ResultsCohortDefinition,
    Error,
    UseUpdateApiCohortDefinitionsCohortDefinitionIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      cohort_definition_id,
      body,
    }: UseUpdateApiCohortDefinitionsCohortDefinitionIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions/${cohort_definition_id}`,
        {
          method: 'PUT',
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
