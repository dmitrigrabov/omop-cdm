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

export type UseUpdateApiCohortsIdArgs = {
  id: number
  body: ResultsCohortCreate
}

export const useUpdateApiCohortsId = (
  args: UseMutationOptions<
    ResultsCohort,
    Error,
    UseUpdateApiCohortsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiCohortsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/cohorts/${id}`,
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
