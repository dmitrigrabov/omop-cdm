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

export type UseUpdateApiCohortDefinitionsIdArgs = {
  id: string
  body: ResultsCohortDefinitionCreate
}

export const useUpdateApiCohortDefinitionsId = (
  args: UseMutationOptions<
    ResultsCohortDefinition,
    Error,
    UseUpdateApiCohortDefinitionsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiCohortDefinitionsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions/${id}`,
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
