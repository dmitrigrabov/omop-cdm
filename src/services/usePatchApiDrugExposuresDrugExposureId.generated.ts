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
import { z } from 'zod'

export type UsePatchApiDrugExposuresDrugExposureIdArgs = {
  drug_exposure_id: number
  body: ClinicalDrugExposureUpdate
}

export const usePatchApiDrugExposuresDrugExposureId = (
  args: UseMutationOptions<
    ClinicalDrugExposure,
    Error,
    UsePatchApiDrugExposuresDrugExposureIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      drug_exposure_id,
      body,
    }: UsePatchApiDrugExposuresDrugExposureIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-exposures/${drug_exposure_id}`,
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
