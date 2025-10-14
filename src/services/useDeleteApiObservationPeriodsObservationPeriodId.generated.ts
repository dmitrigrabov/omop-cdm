import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiObservationPeriodsObservationPeriodIdArgs = {
  observation_period_id: number
}

export const useDeleteApiObservationPeriodsObservationPeriodIdResponse =
  z.void()

export type UseDeleteApiObservationPeriodsObservationPeriodIdResponse = void

export type DeleteApiObservationPeriodsObservationPeriodIdBody = void

export const useDeleteApiObservationPeriodsObservationPeriodId = (
  args: UseMutationOptions<
    UseDeleteApiObservationPeriodsObservationPeriodIdResponse,
    Error,
    UseDeleteApiObservationPeriodsObservationPeriodIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      observation_period_id,
    }: UseDeleteApiObservationPeriodsObservationPeriodIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods/${observation_period_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiObservationPeriodsObservationPeriodIdResponse.parse(
        data,
      )
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - ObservationPeriods'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
