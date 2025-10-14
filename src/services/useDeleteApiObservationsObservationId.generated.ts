import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiObservationsObservationIdArgs = {
  observation_id: number
}

export const useDeleteApiObservationsObservationIdResponse = z.void()

export type UseDeleteApiObservationsObservationIdResponse = void

export type DeleteApiObservationsObservationIdBody = void

export const useDeleteApiObservationsObservationId = (
  args: UseMutationOptions<
    UseDeleteApiObservationsObservationIdResponse,
    Error,
    UseDeleteApiObservationsObservationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      observation_id,
    }: UseDeleteApiObservationsObservationIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observations/${observation_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiObservationsObservationIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Clinical - Observations'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
