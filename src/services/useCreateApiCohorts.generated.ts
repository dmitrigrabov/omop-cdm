import { ResultsCohortCreate } from '@/types/resultsCohortCreate.generated.ts'
import {
  resultsCohort,
  ResultsCohort,
} from '@/types/resultsCohort.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseCreateApiCohortsArgs = { body: ResultsCohortCreate }

export const useCreateApiCohorts = (
  args: UseMutationOptions<
    ResultsCohort,
    Error,
    UseCreateApiCohortsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiCohortsArgs) => {
      const { data, error } = await supabase.functions.invoke(`/cohorts`, {
        method: 'POST',
        body,
      })

      if (error) {
        throw error
      }

      return resultsCohort.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({ queryKey: ['Results - Cohorts'] })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
