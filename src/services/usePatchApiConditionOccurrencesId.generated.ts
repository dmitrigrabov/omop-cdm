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

export type UsePatchApiConditionOccurrencesIdArgs = {
  id: number
  body: ClinicalConditionOccurrenceUpdate
}

export const usePatchApiConditionOccurrencesId = (
  args: UseMutationOptions<
    ClinicalConditionOccurrence,
    Error,
    UsePatchApiConditionOccurrencesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiConditionOccurrencesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-occurrences/${id}`,
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
