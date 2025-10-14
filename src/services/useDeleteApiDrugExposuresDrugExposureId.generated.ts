import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiDrugExposuresDrugExposureIdArgs = {
  drug_exposure_id: number
}

export const useDeleteApiDrugExposuresDrugExposureIdResponse = z.void()

export type UseDeleteApiDrugExposuresDrugExposureIdResponse = void

export type DeleteApiDrugExposuresDrugExposureIdBody = void

export const useDeleteApiDrugExposuresDrugExposureId = (
  args: UseMutationOptions<
    UseDeleteApiDrugExposuresDrugExposureIdResponse,
    Error,
    UseDeleteApiDrugExposuresDrugExposureIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      drug_exposure_id,
    }: UseDeleteApiDrugExposuresDrugExposureIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/drug-exposures/${drug_exposure_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiDrugExposuresDrugExposureIdResponse.parse(data)
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
