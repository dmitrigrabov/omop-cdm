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
import { z } from 'zod'

export type UseUpdateApiCohortsCohortIdArgs = {
  cohort_id: number
  body: ResultsCohortCreate
}

export const useUpdateApiCohortsCohortId = (
  args: UseMutationOptions<
    ResultsCohort,
    Error,
    UseUpdateApiCohortsCohortIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      cohort_id,
      body,
    }: UseUpdateApiCohortsCohortIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohorts/${cohort_id}`,
        {
          method: 'PUT',
          body,
        },
      )

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
