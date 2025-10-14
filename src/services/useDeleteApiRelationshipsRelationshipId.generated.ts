import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiRelationshipsRelationshipIdArgs = {
  relationship_id: string
}

export const useDeleteApiRelationshipsRelationshipIdResponse = z.void()

export type UseDeleteApiRelationshipsRelationshipIdResponse = void

export type DeleteApiRelationshipsRelationshipIdBody = void

export const useDeleteApiRelationshipsRelationshipId = (
  args: UseMutationOptions<
    UseDeleteApiRelationshipsRelationshipIdResponse,
    Error,
    UseDeleteApiRelationshipsRelationshipIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      relationship_id,
    }: UseDeleteApiRelationshipsRelationshipIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/relationships/${relationship_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiRelationshipsRelationshipIdResponse.parse(data)
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
