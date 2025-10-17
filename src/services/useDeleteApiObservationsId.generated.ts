import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiObservationsIdArgs = { id: string }

export const useDeleteApiObservationsIdResponse = z.void()

export type UseDeleteApiObservationsIdResponse = void

export type DeleteApiObservationsIdBody = void

export const useDeleteApiObservationsId = (
  args: UseMutationOptions<
    UseDeleteApiObservationsIdResponse,
    Error,
    UseDeleteApiObservationsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiObservationsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/observations/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiObservationsIdResponse.parse(data)
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
