import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptRelationshipsConceptRelationshipIdArgs = {
  concept_relationship_id: number
}

export const useDeleteApiConceptRelationshipsConceptRelationshipIdResponse =
  z.void()

export type UseDeleteApiConceptRelationshipsConceptRelationshipIdResponse = void

export type DeleteApiConceptRelationshipsConceptRelationshipIdBody = void

export const useDeleteApiConceptRelationshipsConceptRelationshipId = (
  args: UseMutationOptions<
    UseDeleteApiConceptRelationshipsConceptRelationshipIdResponse,
    Error,
    UseDeleteApiConceptRelationshipsConceptRelationshipIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_relationship_id,
    }: UseDeleteApiConceptRelationshipsConceptRelationshipIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-relationships/${concept_relationship_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptRelationshipsConceptRelationshipIdResponse.parse(
        data,
      )
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
