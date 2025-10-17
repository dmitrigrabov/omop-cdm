import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiRelationshipsIdArgs = { id: string }

export const useDeleteApiRelationshipsIdResponse = z.void()

export type UseDeleteApiRelationshipsIdResponse = void

export type DeleteApiRelationshipsIdBody = void

export const useDeleteApiRelationshipsId = (
  args: UseMutationOptions<
    UseDeleteApiRelationshipsIdResponse,
    Error,
    UseDeleteApiRelationshipsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiRelationshipsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiRelationshipsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - Relationships'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
