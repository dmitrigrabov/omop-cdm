import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiLocationsIdArgs = { id: string }

export const useDeleteApiLocationsIdResponse = z.void()

export type UseDeleteApiLocationsIdResponse = void

export type DeleteApiLocationsIdBody = void

export const useDeleteApiLocationsId = (
  args: UseMutationOptions<
    UseDeleteApiLocationsIdResponse,
    Error,
    UseDeleteApiLocationsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiLocationsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/locations/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiLocationsIdResponse.parse(data)
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
