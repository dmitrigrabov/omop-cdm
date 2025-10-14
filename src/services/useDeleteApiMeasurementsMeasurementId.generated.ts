import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiMeasurementsMeasurementIdArgs = {
  measurement_id: number
}

export const useDeleteApiMeasurementsMeasurementIdResponse = z.void()

export type UseDeleteApiMeasurementsMeasurementIdResponse = void

export type DeleteApiMeasurementsMeasurementIdBody = void

export const useDeleteApiMeasurementsMeasurementId = (
  args: UseMutationOptions<
    UseDeleteApiMeasurementsMeasurementIdResponse,
    Error,
    UseDeleteApiMeasurementsMeasurementIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      measurement_id,
    }: UseDeleteApiMeasurementsMeasurementIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/measurements/${measurement_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiMeasurementsMeasurementIdResponse.parse(data)
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
