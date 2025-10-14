import { ClinicalConditionOccurrenceUpdate } from '@/types/clinicalConditionOccurrenceUpdate.generated.ts'
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

export type UsePatchApiConditionOccurrencesConditionOccurrenceIdArgs = {
  condition_occurrence_id: number
  body: ClinicalConditionOccurrenceUpdate
}

export const usePatchApiConditionOccurrencesConditionOccurrenceId = (
  args: UseMutationOptions<
    ClinicalConditionOccurrence,
    Error,
    UsePatchApiConditionOccurrencesConditionOccurrenceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      condition_occurrence_id,
      body,
    }: UsePatchApiConditionOccurrencesConditionOccurrenceIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-occurrences/${condition_occurrence_id}`,
        {
          method: 'PATCH',
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
