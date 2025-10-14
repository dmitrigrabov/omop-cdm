import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptAncestorsConceptAncestorIdArgs = {
  concept_ancestor_id: number
}

export const useDeleteApiConceptAncestorsConceptAncestorIdResponse = z.void()

export type UseDeleteApiConceptAncestorsConceptAncestorIdResponse = void

export type DeleteApiConceptAncestorsConceptAncestorIdBody = void

export const useDeleteApiConceptAncestorsConceptAncestorId = (
  args: UseMutationOptions<
    UseDeleteApiConceptAncestorsConceptAncestorIdResponse,
    Error,
    UseDeleteApiConceptAncestorsConceptAncestorIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_ancestor_id,
    }: UseDeleteApiConceptAncestorsConceptAncestorIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-ancestors/${concept_ancestor_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptAncestorsConceptAncestorIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptAncestors'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
