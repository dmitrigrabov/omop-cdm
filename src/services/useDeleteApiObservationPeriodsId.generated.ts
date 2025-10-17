import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiObservationPeriodsIdArgs = { id: number }

export const useDeleteApiObservationPeriodsIdResponse = z.void()

export type UseDeleteApiObservationPeriodsIdResponse = void

export type DeleteApiObservationPeriodsIdBody = void

export const useDeleteApiObservationPeriodsId = (
  args: UseMutationOptions<
    UseDeleteApiObservationPeriodsIdResponse,
    Error,
    UseDeleteApiObservationPeriodsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiObservationPeriodsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observation-periods/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiObservationPeriodsIdResponse.parse(data)
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
