import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiMeasurementsIdArgs = { id: string }

export const useDeleteApiMeasurementsIdResponse = z.void()

export type UseDeleteApiMeasurementsIdResponse = void

export type DeleteApiMeasurementsIdBody = void

export const useDeleteApiMeasurementsId = (
  args: UseMutationOptions<
    UseDeleteApiMeasurementsIdResponse,
    Error,
    UseDeleteApiMeasurementsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiMeasurementsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/measurements/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiMeasurementsIdResponse.parse(data)
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
