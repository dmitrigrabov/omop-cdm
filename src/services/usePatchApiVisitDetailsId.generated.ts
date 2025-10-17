import { ClinicalVisitDetailUpdate } from '@/types/clinicalVisitDetailUpdate.generated.ts'
import {
  clinicalVisitDetail,
  ClinicalVisitDetail,
} from '@/types/clinicalVisitDetail.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiVisitDetailsIdArgs = {
  id: number
  body: ClinicalVisitDetailUpdate
}

export const usePatchApiVisitDetailsId = (
  args: UseMutationOptions<
    ClinicalVisitDetail,
    Error,
    UsePatchApiVisitDetailsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiVisitDetailsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-details/${id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalVisitDetail.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - VisitDetails'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
