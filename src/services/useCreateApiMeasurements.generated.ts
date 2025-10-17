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

export type UseCreateApiMeasurementsArgs = { body: ClinicalMeasurementCreate }

export const useCreateApiMeasurements = (
  args: UseMutationOptions<
    ClinicalMeasurement,
    Error,
    UseCreateApiMeasurementsArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ body }: UseCreateApiMeasurementsArgs) => {
      const { data, error } = await supabase.functions.invoke(`/measurements`, {
        method: 'POST',
        body,
      })

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
