import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptRelationshipsIdArgs = { id: number }

export const useDeleteApiConceptRelationshipsIdResponse = z.void()

export type UseDeleteApiConceptRelationshipsIdResponse = void

export type DeleteApiConceptRelationshipsIdBody = void

export const useDeleteApiConceptRelationshipsId = (
  args: UseMutationOptions<
    UseDeleteApiConceptRelationshipsIdResponse,
    Error,
    UseDeleteApiConceptRelationshipsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiConceptRelationshipsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-relationships/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptRelationshipsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptRelationships'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
