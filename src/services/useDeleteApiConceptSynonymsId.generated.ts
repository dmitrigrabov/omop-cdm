import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptSynonymsIdArgs = { id: string }

export const useDeleteApiConceptSynonymsIdResponse = z.void()

export type UseDeleteApiConceptSynonymsIdResponse = void

export type DeleteApiConceptSynonymsIdBody = void

export const useDeleteApiConceptSynonymsId = (
  args: UseMutationOptions<
    UseDeleteApiConceptSynonymsIdResponse,
    Error,
    UseDeleteApiConceptSynonymsIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({ id }: UseDeleteApiConceptSynonymsIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptSynonymsIdResponse.parse(data)
    },
    onSuccess: (...successArgs) => {
      // Invalidate and refetch
      void queryClient.invalidateQueries({
        queryKey: ['Vocabulary - ConceptSynonyms'],
      })

      onSuccess?.(...successArgs)
    },
    ...rest,
  })
}
