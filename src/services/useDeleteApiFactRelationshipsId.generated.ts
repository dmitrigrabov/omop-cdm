import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiFactRelationshipsIdArgs = { id: string }

export const useDeleteApiFactRelationshipsIdResponse = z.void()

export type UseDeleteApiFactRelationshipsIdResponse = void

export type DeleteApiFactRelationshipsIdBody = void

export const useDeleteApiFactRelationshipsId = (
  args: UseMutationOptions<
    UseDeleteApiFactRelationshipsIdResponse,
    Error,
    UseDeleteApiFactRelationshipsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiFactRelationshipsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiFactRelationshipsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Results - FactRelationships'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
