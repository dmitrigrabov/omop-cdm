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

export type UseCreateApiVisitOccurrencesArgs = {
  body: ClinicalVisitOccurrenceCreate
}

export const useCreateApiVisitOccurrences = (
  args: UseMutationOptions<
    ClinicalVisitOccurrence,
    Error,
    UseCreateApiVisitOccurrencesArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiVisitOccurrencesArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-occurrences`,
        {
          method: 'POST',
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
