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

export type UseCreateApiConditionOccurrencesArgs = {
  body: ClinicalConditionOccurrenceCreate
}

export const useCreateApiConditionOccurrences = (
  args: UseMutationOptions<
    ClinicalConditionOccurrence,
    Error,
    UseCreateApiConditionOccurrencesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiConditionOccurrencesArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/condition-occurrences`,
        {
          method: 'POST',
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
