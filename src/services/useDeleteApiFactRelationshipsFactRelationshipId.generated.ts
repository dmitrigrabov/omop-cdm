import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiFactRelationshipsFactRelationshipIdArgs = {
  fact_relationship_id: number
}

export const useDeleteApiFactRelationshipsFactRelationshipIdResponse = z.void()

export type UseDeleteApiFactRelationshipsFactRelationshipIdResponse = void

export type DeleteApiFactRelationshipsFactRelationshipIdBody = void

export const useDeleteApiFactRelationshipsFactRelationshipId = (
  args: UseMutationOptions<
    UseDeleteApiFactRelationshipsFactRelationshipIdResponse,
    Error,
    UseDeleteApiFactRelationshipsFactRelationshipIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      fact_relationship_id,
    }: UseDeleteApiFactRelationshipsFactRelationshipIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/fact-relationships/${fact_relationship_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiFactRelationshipsFactRelationshipIdResponse.parse(data)
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
