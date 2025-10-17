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

export type UsePatchApiCohortsIdArgs = { id: string; body: ResultsCohortUpdate }

export const usePatchApiCohortsId = (
  args: UseMutationOptions<
    ResultsCohort,
    Error,
    UsePatchApiCohortsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiCohortsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohorts/${id}`,
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
