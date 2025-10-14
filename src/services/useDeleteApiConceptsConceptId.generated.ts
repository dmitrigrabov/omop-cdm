import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptsConceptIdArgs = { concept_id: number }

export const useDeleteApiConceptsConceptIdResponse = z.void()

export type UseDeleteApiConceptsConceptIdResponse = void

export type DeleteApiConceptsConceptIdBody = void

export const useDeleteApiConceptsConceptId = (
  args: UseMutationOptions<
    UseDeleteApiConceptsConceptIdResponse,
    Error,
    UseDeleteApiConceptsConceptIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ concept_id }: UseDeleteApiConceptsConceptIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concepts/${concept_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptsConceptIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - Concepts'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
