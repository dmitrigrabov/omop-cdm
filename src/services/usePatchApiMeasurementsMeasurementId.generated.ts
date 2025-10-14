import { ClinicalMeasurementUpdate } from '@/types/clinicalMeasurementUpdate.generated.ts'
import {
  clinicalMeasurement,
  ClinicalMeasurement,
} from '@/types/clinicalMeasurement.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiMeasurementsMeasurementIdArgs = {
  measurement_id: number
  body: ClinicalMeasurementUpdate
}

export const usePatchApiMeasurementsMeasurementId = (
  args: UseMutationOptions<
    ClinicalMeasurement,
    Error,
    UsePatchApiMeasurementsMeasurementIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      measurement_id,
      body,
    }: UsePatchApiMeasurementsMeasurementIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/measurements/${measurement_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return clinicalMeasurement.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - Measurements'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
