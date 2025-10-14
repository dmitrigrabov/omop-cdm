import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'

export type UseDeleteApiConceptSynonymsConceptSynonymIdArgs = {
  concept_synonym_id: number
}

export const useDeleteApiConceptSynonymsConceptSynonymIdResponse = z.void()

export type UseDeleteApiConceptSynonymsConceptSynonymIdResponse = void

export type DeleteApiConceptSynonymsConceptSynonymIdBody = void

export const useDeleteApiConceptSynonymsConceptSynonymId = (
  args: UseMutationOptions<
    UseDeleteApiConceptSynonymsConceptSynonymIdResponse,
    Error,
    UseDeleteApiConceptSynonymsConceptSynonymIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_synonym_id,
    }: UseDeleteApiConceptSynonymsConceptSynonymIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-synonyms/${concept_synonym_id}`,
        {
          method: 'DELETE',
        },
      )

      if (error) {
        throw error
      }

      return useDeleteApiConceptSynonymsConceptSynonymIdResponse.parse(data)
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
