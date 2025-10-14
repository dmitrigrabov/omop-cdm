import { ClinicalVisitDetailCreate } from '@/types/clinicalVisitDetailCreate.generated.ts'
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

export type UseUpdateApiVisitDetailsVisitDetailIdArgs = {
  visit_detail_id: number
  body: ClinicalVisitDetailCreate
}

export const useUpdateApiVisitDetailsVisitDetailId = (
  args: UseMutationOptions<
    ClinicalVisitDetail,
    Error,
    UseUpdateApiVisitDetailsVisitDetailIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      visit_detail_id,
      body,
    }: UseUpdateApiVisitDetailsVisitDetailIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-details/${visit_detail_id}`,
        {
          method: 'PUT',
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
