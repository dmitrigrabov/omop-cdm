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

export type UseCreateApiCohortDefinitionsArgs = {
  body: ResultsCohortDefinitionCreate
}

export const useCreateApiCohortDefinitions = (
  args: UseMutationOptions<
    ResultsCohortDefinition,
    Error,
    UseCreateApiCohortDefinitionsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiCohortDefinitionsArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohort-definitions`,
        {
          method: 'POST',
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
