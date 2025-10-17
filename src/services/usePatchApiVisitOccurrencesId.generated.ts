import { ClinicalVisitOccurrenceUpdate } from '@/types/clinicalVisitOccurrenceUpdate.generated.ts'
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

export type UsePatchApiVisitOccurrencesIdArgs = {
  id: string
  body: ClinicalVisitOccurrenceUpdate
}

export const usePatchApiVisitOccurrencesId = (
  args: UseMutationOptions<
    ClinicalVisitOccurrence,
    Error,
    UsePatchApiVisitOccurrencesIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiVisitOccurrencesIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-occurrences/${id}`,
        {
          method: 'PATCH',
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
