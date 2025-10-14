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

export type UsePatchApiVisitDetailsVisitDetailIdArgs = {
  visit_detail_id: number
  body: ClinicalVisitDetailUpdate
}

export const usePatchApiVisitDetailsVisitDetailId = (
  args: UseMutationOptions<
    ClinicalVisitDetail,
    Error,
    UsePatchApiVisitDetailsVisitDetailIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      visit_detail_id,
      body,
    }: UsePatchApiVisitDetailsVisitDetailIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-details/${visit_detail_id}`,
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
