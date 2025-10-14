import { ClinicalMeasurementCreate } from '@/types/clinicalMeasurementCreate.generated.ts'
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

export type UseUpdateApiMeasurementsMeasurementIdArgs = {
  measurement_id: number
  body: ClinicalMeasurementCreate
}

export const useUpdateApiMeasurementsMeasurementId = (
  args: UseMutationOptions<
    ClinicalMeasurement,
    Error,
    UseUpdateApiMeasurementsMeasurementIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      measurement_id,
      body,
    }: UseUpdateApiMeasurementsMeasurementIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/measurements/${measurement_id}`,
        {
          method: 'PUT',
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
