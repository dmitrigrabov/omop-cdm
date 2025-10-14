import { ResultsCohortUpdate } from '@/types/resultsCohortUpdate.generated.ts'
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

export type UsePatchApiCohortsCohortIdArgs = {
  cohort_id: number
  body: ResultsCohortUpdate
}

export const usePatchApiCohortsCohortId = (
  args: UseMutationOptions<
    ResultsCohort,
    Error,
    UsePatchApiCohortsCohortIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ cohort_id, body }: UsePatchApiCohortsCohortIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohorts/${cohort_id}`,
        {
          method: 'PATCH',
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
