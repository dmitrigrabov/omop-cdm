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

export type UseUpdateApiVisitOccurrencesIdArgs = {
  id: number
  body: ClinicalVisitOccurrenceCreate
}

export const useUpdateApiVisitOccurrencesId = (
  args: UseMutationOptions<
    ClinicalVisitOccurrence,
    Error,
    UseUpdateApiVisitOccurrencesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiVisitOccurrencesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-occurrences/${id}`,
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
