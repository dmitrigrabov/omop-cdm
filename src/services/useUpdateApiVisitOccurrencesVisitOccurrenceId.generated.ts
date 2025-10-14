import { ClinicalVisitOccurrenceCreate } from '@/types/clinicalVisitOccurrenceCreate.generated.ts'
import {
  clinicalVisitOccurrence,
  ClinicalVisitOccurrence,
} from '@/types/clinicalVisitOccurrence.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UseUpdateApiVisitOccurrencesVisitOccurrenceIdArgs = {
  visit_occurrence_id: number
  body: ClinicalVisitOccurrenceCreate
}

export const useUpdateApiVisitOccurrencesVisitOccurrenceId = (
  args: UseMutationOptions<
    ClinicalVisitOccurrence,
    Error,
    UseUpdateApiVisitOccurrencesVisitOccurrenceIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      visit_occurrence_id,
      body,
    }: UseUpdateApiVisitOccurrencesVisitOccurrenceIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-occurrences/${visit_occurrence_id}`,
        {
          method: 'PUT',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalVisitOccurrence.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - VisitOccurrences'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
