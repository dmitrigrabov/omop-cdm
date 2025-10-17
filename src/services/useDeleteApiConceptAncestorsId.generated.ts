import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptAncestorsIdArgs = { id: string }

export const useDeleteApiConceptAncestorsIdResponse = z.void()

export type UseDeleteApiConceptAncestorsIdResponse = void

export type DeleteApiConceptAncestorsIdBody = void

export const useDeleteApiConceptAncestorsId = (
  args: UseMutationOptions<
    UseDeleteApiConceptAncestorsIdResponse,
    Error,
    UseDeleteApiConceptAncestorsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiConceptAncestorsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-ancestors/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptAncestorsIdResponse.parse(data)
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
