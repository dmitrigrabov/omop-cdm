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

export type UsePatchApiMeasurementsIdArgs = {
  id: number
  body: ClinicalMeasurementUpdate
}

export const usePatchApiMeasurementsId = (
  args: UseMutationOptions<
    ClinicalMeasurement,
    Error,
    UsePatchApiMeasurementsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id, body }: UsePatchApiMeasurementsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/measurements/${id}`,
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
