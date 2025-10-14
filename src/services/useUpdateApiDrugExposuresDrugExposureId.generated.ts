import { ClinicalDrugExposureCreate } from '@/types/clinicalDrugExposureCreate.generated.ts'
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

export type UseUpdateApiDrugExposuresDrugExposureIdArgs = {
  drug_exposure_id: number
  body: ClinicalDrugExposureCreate
}

export const useUpdateApiDrugExposuresDrugExposureId = (
  args: UseMutationOptions<
    ClinicalDrugExposure,
    Error,
    UseUpdateApiDrugExposuresDrugExposureIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      drug_exposure_id,
      body,
    }: UseUpdateApiDrugExposuresDrugExposureIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-exposures/${drug_exposure_id}`,
        {
          method: 'PUT',
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
