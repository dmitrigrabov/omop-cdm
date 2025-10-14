import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiLocationsLocationIdArgs = { location_id: number }

export const useDeleteApiLocationsLocationIdResponse = z.void()

export type UseDeleteApiLocationsLocationIdResponse = void

export type DeleteApiLocationsLocationIdBody = void

export const useDeleteApiLocationsLocationId = (
  args: UseMutationOptions<
    UseDeleteApiLocationsLocationIdResponse,
    Error,
    UseDeleteApiLocationsLocationIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      location_id,
    }: UseDeleteApiLocationsLocationIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/locations/${location_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiLocationsLocationIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Health System - Locations'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
