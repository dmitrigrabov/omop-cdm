import { ClinicalConditionOccurrenceCreate } from '@/types/clinicalConditionOccurrenceCreate.generated.ts'
import {
  clinicalConditionOccurrence,
  ClinicalConditionOccurrence,
} from '@/types/clinicalConditionOccurrence.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiConditionOccurrencesConditionOccurrenceIdArgs = {
  condition_occurrence_id: number
  body: ClinicalConditionOccurrenceCreate
}

export const useUpdateApiConditionOccurrencesConditionOccurrenceId = (
  args: UseMutationOptions<
    ClinicalConditionOccurrence,
    Error,
    UseUpdateApiConditionOccurrencesConditionOccurrenceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      condition_occurrence_id,
      body,
    }: UseUpdateApiConditionOccurrencesConditionOccurrenceIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-occurrences/${condition_occurrence_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalConditionOccurrence.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - ConditionOccurrences'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
