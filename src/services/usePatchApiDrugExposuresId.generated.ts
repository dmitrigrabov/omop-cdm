import { ClinicalDrugExposureUpdate } from '@/types/clinicalDrugExposureUpdate.generated.ts'
import {
  clinicalDrugExposure,
  ClinicalDrugExposure,
} from '@/types/clinicalDrugExposure.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UsePatchApiDrugExposuresIdArgs = {
  id: number
  body: ClinicalDrugExposureUpdate
}

export const usePatchApiDrugExposuresId = (
  args: UseMutationOptions<
    ClinicalDrugExposure,
    Error,
    UsePatchApiDrugExposuresIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiDrugExposuresIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-exposures/${id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalDrugExposure.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - DrugExposures'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
