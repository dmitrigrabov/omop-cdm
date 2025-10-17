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

export type UsePatchApiCohortDefinitionsIdArgs = {
  id: number
  body: ResultsCohortDefinitionUpdate
}

export const usePatchApiCohortDefinitionsId = (
  args: UseMutationOptions<
    ResultsCohortDefinition,
    Error,
    UsePatchApiCohortDefinitionsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiCohortDefinitionsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions/${id}`,
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
