import { VocabularyConceptAncestorUpdate } from '@/types/vocabularyConceptAncestorUpdate.generated.ts'
import {
  vocabularyConceptAncestor,
  VocabularyConceptAncestor,
} from '@/types/vocabularyConceptAncestor.generated.ts'
import { supabase } from '@/lib/supabase'
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from '@tanstack/react-query'
import { z } from 'zod'

export type UsePatchApiConceptAncestorsConceptAncestorIdArgs = {
  concept_ancestor_id: number
  body: VocabularyConceptAncestorUpdate
}

export const usePatchApiConceptAncestorsConceptAncestorId = (
  args: UseMutationOptions<
    VocabularyConceptAncestor,
    Error,
    UsePatchApiConceptAncestorsConceptAncestorIdArgs,
    unknown
  > = {},
) => {
  const queryClient = useQueryClient()

  const { onSuccess, ...rest } = args

  return useMutation({
    mutationFn: async ({
      concept_ancestor_id,
      body,
    }: UsePatchApiConceptAncestorsConceptAncestorIdArgs) => {
      const { data, error } = await supabase.functions.invoke(
        `/concept-ancestors/${concept_ancestor_id}`,
        {
          method: 'PATCH',
          body,
        },
      )

      if (error) {
        throw error
      }

      return vocabularyConceptAncestor.parse(data)
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
