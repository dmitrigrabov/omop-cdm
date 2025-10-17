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

export type UseUpdateApiVisitDetailsIdArgs = {
  id: number
  body: ClinicalVisitDetailCreate
}

export const useUpdateApiVisitDetailsId = (
  args: UseMutationOptions<
    ClinicalVisitDetail,
    Error,
    UseUpdateApiVisitDetailsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UseUpdateApiVisitDetailsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/visit-details/${id}`,
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
